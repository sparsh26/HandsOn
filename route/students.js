const route = require('express').Router()

/**
 * GET requests
 */
route.get('/', (req, res) => {
    res.send('students')
})

route.get('/:studentId', (req, res) => {
    res.send('students/id')
})

route.get('/:studentId/batches', (req, res) => {
    res.send('students/id/batches')
})

/**
 * POST requests
 */
// Add new student to the database
route.post('/', (req, res) => {

})

/**
 * PUT requests
 */
// Update student with given student Id
route.put('/:studentId', (req, res) => {

})

/**
 * DELETE requests
 */
// Delete student with given student Id
route.delete('/:studentId', (req, res) => {

})

module.exports = route