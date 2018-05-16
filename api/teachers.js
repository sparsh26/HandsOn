const route = require('express').Router()
const path = require('path')

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const SubTeachMap = require('../db').SubTeachMap
const Batch = require('../db').Batch
const Lecture = require('../db').Lecture


route.get('/:id/batches', (req, res) => {
    let tId = req.params.id

    SubTeachMap.findAll({
        where: {
            teacherId: tId
        },
        attributes: ['lectureId']
    }).then((lectureIds) => {
        let lectureArray = []
        lectureIds.forEach((lecture) => {
            console.log("here" + lecture.lectureId)
            lectureArray.push(lecture.lectureId)
        })
        console.log(lectureArray);
        Lecture.findAll({
            where: {
                id: {
                    [Op.in]: lectureArray
                }
            },
            attributes: ['batchId']
        }).then((batchIds) => {
            let batchArray = []
            batchIds.forEach((batch) => {
                console.log("here" + batch.batchId)
                batchArray.push(batch.batchId)
            })
            console.log("batchArray: " + batchArray)
            Batch.findAll({
                where: {
                    id: {
                        [Op.in]: batchArray
                    }
                }
            }).then((batch) => {
                res.json(batch);
            })
        })
    })
})
route.get('/:id', (req, res) => {
    const teacherId = req.params.id
    Teacher.findAll({
            where: {
                id: teacherId
            }
        })
        .then((teacher) => {
            res.status(200).json(teacher)
        })

})


route.get('/', (req, res) => {
    Teacher.findAll({})
        .then((teachers) => {
            res.status(200).json(teachers)
        })
})




/**
 * POST requests
 */
// Add new Teacher to the database
route.post('/', (req, res) => {

    let TeacherName = req.query.name

    // console.log("<> " + CourseName)

    const TeacherObj = new Teacher({
        name: TeacherName
    });

    TeacherObj.save();
    res.send({
        sucess: true
    })
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