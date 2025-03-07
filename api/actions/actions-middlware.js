// add middlewares here related to actions
const Action = require('./actions-model')

const validateActionId = async (req, res, next) => {
  try {
    const action = await Action.get(req.params.id)

    if (!action) {
      res.status(404).json({message: 'No actions were found with that ID'})
    } else {
      req.action = action
      next()
    }
  } catch(err) {
    res.status(500).json({message: 'an error occured, action not found'})
  }
}

const validateAction = async (req, res, next) => {
  const {project_id, description, notes, completed} = req.body
  if(!project_id){
    res.status(400).json({message: 'missing required project id'})
  }
  if(!notes || !notes.trim){
    res.status(400).json({message: 'missing required project notes'})
  } else{
    req.project_id = project_id
    req.description = description.trim()
    req.notes = notes.trim()
    req.completed = completed
    next()
  }
}

module.exports = {validateActionId, validateAction} 