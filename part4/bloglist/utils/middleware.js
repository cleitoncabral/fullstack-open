const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'JsonWebtokenError') {
    return response.status(400).json({error: error.message})
  } else if (error.name === 'TokenExpiredError'){
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  try {
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, process.env.SECRET)
      request.userId = decodedToken
    } else {
      console.log('error')
    }
  }
  catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({error: 'token invalid'})
    }
    
    return next(error)
  }
  
  next();
};

const userExtractor = async (request, response, next) => {
  
  try {
    const token = request.userId
    
    if (token) {
      const user = await User.findById(token.id)
      request.user = user
    }
  }
  catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({error: 'user invalid'})
    }
    return null
  }

  next()
}



// const userExtractor = async (request, response, next) => {
  // const user = await User.findById(request.userId)
  // console.log(request)
  // try {
  //   if (user) {
  //     // console.log(user)
  //     return request.user = user
  //   }
  // }
  // catch (error) {
  //   if (error instanceof jwt.JsonWebTokenError) {
  //     return response.status(401).json({error: 'user invalid'})
  //   }
  //   return null
  // }
  // request.user
  // next()
// }

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}