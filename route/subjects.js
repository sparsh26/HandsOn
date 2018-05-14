const route = require('express').Router()

/**
 * GET requests
 */
route.get('/', (req, res) => {
    res.send('subjects')
})

route.get('/:subjectId', (req, res) => {
    res.send('subjects/id')
})

route.get('/:subjectId/teachers', (req, res) => {
    res.send('subjects/id/teachers')
})

/**
 * POST requests
 */
// Add new Subject to the database
route.post('/', (req, res) => {

})

/**
 * PUT requests
 */
// Update subject with given subject Id
route.put('/:subjectId', (req, res) => {

})

/**
 * DELETE requests
 */
// Delete subject with given subject Id
route.delete('/:subjectId', (req, res) => {

})

module.exports = route