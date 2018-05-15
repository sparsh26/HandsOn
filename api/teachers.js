const route = require('express').Router()

/**
 * GET requests
 */
route.get('/', (req, res) => {
    res.send('teachers')
})

route.get('/:teacherId', (req, res) => {
    res.send('teachers/id')
})

route.get('/:teacherId/batches', (req, res) => {
    res.send('teachers/id/batches')
})

/**
 * POST requests
 */
// Add new Teacher to the database
route.post('/', (req, res) => {

})

/**
 * PUT requests
 */
// Update Teacher with given subject Id
route.put('/:teacherId', (req, res) => {

})

/**
 * DELETE requests
 */
// Delete Teacher with given subject Id
route.delete('/:teacherId', (req, res) => {

})

module.exports = route