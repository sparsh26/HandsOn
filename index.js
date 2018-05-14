var express=require('express'),
          r=require('.app/server/route'),
          app=express(),
          bodyparser=require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/courses/',r.routes.getCourses);
app.get('/courses/:id',r.routes.getId);
app.get('/courses/:id/batches',r.routes.getBatches);
app.get('/courses/:id/batches/:id',r.routes.getBatchId);
app.get('/courses/:id/batches/:id/lectures',r.routes.getLectures);
app.get('/courses/:id/batches/:id/lectures/:id',r.routes.getLId);
app.get('/courses/:id/batches/:id/students',r.routes.getStudents);
app.get('/courses/:id/batches/:id/teachers',r.routes.getTeachers);

app.listen(8000,function(){
    console.log('server is running');
});

