const Sequelize = require('sequelize')
const DB = new Sequelize('learningmanagement', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',
    //port: 3000,
    //pool: {
    //    max: 5,
    //  min: 0,
    //acquire: 30000,
    //idle: 10000 //To create fresh  connection if system is idle for 10000 sec
    //}
    logging: console.log() //This is by default value
});

DB
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

/**
 *  Database Models
 * 
 */
const Course = DB.define('courses', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Batch = DB.define('batches', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Subject = DB.define('subjects', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Teacher = DB.define('teachers', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Lecture = DB.define('lectures', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Student = DB.define('students', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const SubTeachMap = DB.define('subteachmap', {}, {
    timestamps: false
})

const StudentBatchMap = DB.define('studentbatchmap', {}, {
    timestamps: false
})

/** 
 * Relationships 
 */

// One to many Courses:Batches
Course.hasMany(Batch)
Batch.belongsTo(Course)

// One to many Batches:Lectures
Batch.hasMany(Lecture)
Lecture.belongsTo(Batch)

// Subject - teacher map
Subject.hasMany(SubTeachMap)
SubTeachMap.belongsTo(Subject)
Teacher.hasOne(SubTeachMap)
Lecture.hasOne(SubTeachMap)

// many to many Students:Batches
Batch.belongsToMany(Student, {
    through: StudentBatchMap,
    timestamps: false
})
Student.belongsToMany(Batch, {
    through: StudentBatchMap,
    timestamps: false
})



/**
 * Database Sync
 */

DB.sync()
    .then(() =>{
        force = false;
        console.log("Database has been synced")
    })
    .catch((err) => console.error("Error creating database: " + err))


module.exports = {
    Batch, Course, Student, Lecture, Teacher, Subject, SubTeachMap, StudentBatchMap
}