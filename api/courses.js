const route = require('express').Router()
const path = require('path')
const Course = require('../db').Course
const Batch = require('../db').Batch
const Lecture = require('../db').Lecture
const SubTeachMap = require('../db').SubTeachMap
const Teacher = require('../db').Teacher
const Student = require('../db').Student

const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const StudentBatchMap = require('../db').StudentBatchMap

route.get('/:id/batches/:Bid/students', (req, res) => {
    let batchID = req.params.Bid
    console.log((batchID))
    StudentBatchMap.findAll({
        where: {
            batchId: parseInt(batchID)
        },
        attributes: ['studentId']
    }).then((studentIds) => {
        studentArray = []
        studentIds.forEach((student) => {
            console.log("here in here: " + student.studentId)
            studentArray.push(student.studentId)
        })
        console.log(studentArray)
        Student.findAll({
            where: {
                id: {
                    [Op.in]: studentArray
                }
            }
        }).then((student) => {
            res.json(student)
        })
    })
})
route.get('/:id/batches/:bId/teachers', (req, res) => {
    let courseID = req.params.id;
    let batchID = req.params.bId;
    console.log("batch is :" + batchID)
    Lecture.findAll({
        where: {
            batchId: parseInt(batchID)
        },
        attributes: ['id']
    }).then((lectureIds) => {
        let lectureArray = []
        lectureIds.forEach((lecture) => {
            console.log("here" + lecture.id)
            lectureArray.push(lecture.id)
        })
        console.log(lectureArray)
        SubTeachMap.findAll({
            where: {
                lectureId: {
                    [Op.in]: lectureArray
                }
            },
            attributes: ['teacherId']
        }).then((teacherIds) => {
            let teacherArray = []
            teacherIds.forEach((teacher) => {
                console.log("here" + teacher.teacherId)
                teacherArray.push(teacher.teacherId)
            })
            console.log(teacherArray)
            Teacher.findAll({
                where: {
                    id: {
                        [Op.in]: teacherArray
                    }
                }
            }).then((teacher) => {
                res.json(teacher)
            })
        })
    })
})

route.get('/:id/batches/:BId/lectures', (req, res) => {

    const bId = req.params.BId
    Lecture.findAll({
        where: {
            batchId: parseInt(bId)
        }
    }).then((lecture) => {
        res.status(200).json(lecture)
    })
})

route.get('/:id/batches/:BId/lectures/:Lid', (req, res) => {

    Lecture.findAll({
        where: {
            id: req.params.Lid
        }
    }).then((lecture) => {
        res.status(200).json(lecture)
    })
})

route.get('/:id/batches/:Bid', (req, res) => {

    Batch.findAll({
        where: {
            id: req.params.Bid
        }
    }).then((batch) => {
        res.status(200).json(batch)
    })

})

route.get('/:id/batches', (req, res) => {

    let url = req.path;
    let arr = url.split('/');

    const cId = arr[1]
    Batch.findAll({
        where: {
            courseId: parseInt(cId)
        }
    }).then((batch) => {
        res.status(200).json(batch)
    })

})

route.get('/:id', (req, res) => {

    const courseId = req.params.id

    Course.findAll({
        where: {
            id: courseId
        }
    }).then((courses) => {

        res.status(200).json({
            courses
        })

    })
})

route.get('/', (req, res) => {

    Course.findAll({}).then((courses) => {

        res.status(200).json({
            courses
        })

    })


})



/**
 *  POST requests
 */
// Add new course to database
route.post('/', (req, res) => {
    let CourseName = req.query.name

    // console.log("<> " + CourseName)

    const courseObj = new Course({
        name: CourseName
    });

    courseObj.save();
    res.send({
        sucess: true
    })
})

/**
 * Post request on creating batch
 */
//Adding Batch

route.post('/:id/batches', (req, res) => {
    let url = req.path;
    let arr = url.split('/');
    console.log(arr)
    //odd place index will give ids
    //inserting Batch Table
    const cId = arr[1]
    const batchName = req.query.name

    const batchObj = new Batch({
        name: batchName,
        courseId: parseInt(cId)
    })

    batchObj.save()


    res.status(200).json({
        done: true
    })
})

/**
 * post for lectures  //////////////////
 */

route.post('/:id/batches/:BId/lectures', (req, res) => {
    let url = req.path;
    let arr = url.split('/');

    const lname = req.query.name

    //const cId=req.params.id
    const bId = req.params.BId

    const obj = new Lecture({
        batchId: bId,
        name: lname
    })

    obj.save()

    res.status(200).json({
        success: true
    })
})


/**
 * PUT requests
 */
// Update Course with given course Id
route.put('/:courseId', (req, res) => {

})

/**
 * DELETE requests
 */
// Delete Course with given course Id
route.delete('/:courseId', (req, res) => {

})


module.exports = route