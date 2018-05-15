const route = require('express').Router()

/**
 *  Middleware mapping multiple routes
 */
route.use('/courses', require('./courses'))
route.use('/subjects', require('./subjects'))
route.use('/students', require('./students'))
route.use('/teachers', require('./teachers'))

module.exports = {
    route
}