const route = require('express').Router()
const path = require('path')
const Batch = require('../db').Batch
const Course = require('../db').Course

route.get('/:id', (req, res) => {
    let batchId = parseInt(req.params.id);
    // console.log("i am here" + typeof(teacherId));
    Batch.findById(batchId)
    .then(batch => {
        res.json(batch);
    })
})

route.get('/', (req, res) => {
    Batch.findAll({
    }).then((batchList) => {
        res.json(batchList);
    })
})
.post('/', (req, res) => {
    console.log("i am inside")
    let courseId = parseInt (req.query.courseId);
    let batchName = req.query.batchName;
    console.log( courseId +": jsjhsd :" + batchName)
    Course.findOne({
        where: {
            id: courseId
        }
    }).then((course) => {
        Batch.create({
            name : batchName
        }).then((batch) => {
            batch.setCourse(course, { save: false });
            batch.save();
            res.status(201).send(batch);
        }).catch(error => {
            res.send(501).send({
                error: "could not create the batch"
            })
        })
    }).catch((err) => {
        res.send(501).send({
            error: "could not find course"
        })
    })
})

module.exports = route