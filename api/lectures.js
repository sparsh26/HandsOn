const route = require('express').Router()
const path = require('path')
const SubTeachMap = require('../db').SubTeachMap

// Add new Subject to the database
route.post('/:id/subjects/:sId/teachers/:tId', (req, res) => {
    let lId = req.params.id
    let sId = req.params.sId
    let tId = req.params.tId

    const SubTeachObj = new SubTeachMap({
        subjectId: sId,
        teacherId: tId,
        lectureId: lId
    });

    SubTeachObj.save();

    res.send({
        sucess: true
    })
})

module.exports = route