// add middlewares here related to projects
const Projects = require("./projects-model")

const validateProjectId = async (req, res, next) => {
  try{
    const {id} = req.params
    const project = await Projects.get(id)
    if(project){
      req.params = project
      next()
    } else{
      next({status: 404, message: 'Project not found'})
    }
  }catch(err){
    next(err)
  }
}

const validateProject = async (req, res,next) => {
  const {name, description, completed} = req.body
  if(!name || !name.trim()){
    res.status(400).json({message: 'Name field required'})
  } else if(!description || !description.trim()){
    res.status(400).json({message: 'Missing required description field'})
  } else{
    req.name = name.trim()
    req.description = description.trim()
    req.completed = completed
    next()
  }
}

module.exports = {validateProjectId, validateProject} 