var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
require('date-utils');

var newDate = new Date();
var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

const port = 3000;

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'hello',
    password: '0000',
    database: 'comment_db',
});

db.connect();

/*
const sql = 'SELECT * FROM comment_table';

let comment_data;
db.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    comment_data = results;
});
*/
const pic = [
    'https://t1.daumcdn.net/movie/703122e5e7642b0f0c1403aacda268d39b7aa406',
    'http://www.kyeongin.com/mnt/file/201901/20190119001456135_1.jpg',
    'https://post-phinf.pstatic.net/MjAxOTEyMjJfMTEw/MDAxNTc3MDE4MzcwNDY5.CMn8XNjrtiJHQ7bjNyNEpDMw0QS3RHpm3jJQzP2Io-sg.fiLeelTI2e9a9zE-VhLH9aiwNyE0wtQprhznq5GUU3gg.JPEG/home_alone_ver2_xlg.jpg?type=w1200',
    'https://img2.quasarzone.com/editor/2022/10/05/fbafcc80c8994542b94dbecde2d9f2dc.png',
    'https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/03/108335687.1.jpg',
    'https://movie-phinf.pstatic.net/20220808_37/1659920688277bi8Ib_JPEG/movie_image.jpg?type=m665_443_2',
];

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

// Require static assets from public folder
app.set('views', './backend_test/views');
app.use(express.static(path.join(__dirname, 'public')));
// Set view engine as EJS
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
// Set 'views' directory for any views
// being rendered res.render()
app.set('views', path.join(__dirname, ''));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
//////////////////////

app.get('/', (req, res) => {
    let json = { ...pic };
    res.send(json);
});

app.get('/hello', (req, res) => {
    res.send(comment_data);
});

app.get('/getdata', (req, res) => {
    res.send({ hi: 3, bye: 5, everybody: 7 });
});

app.post('/comment', (req, res) => {
    let data = req.body;
    console.log(req.body);
    let sql2 = 'INSERT INTO comment_table (comment_id, comment_des, comment_time) VALUES (?,?,?);';
    let param2 = [data['nickname'], data['comment'], time];
    console.log(param2);
    (async () => {
        await db.query(sql2, param2, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log(rows.insertId);
            }
            res.send(200);
        });
    })();
    console.log('query done');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('not found');
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
/*
let sql2 = 'INSERT INTO comment_table (comment_id, comment_des, comment_time) VALUES (?,?,?);';
let param2 = ['테스트', '센스가 없어서 슬프네요', "2050-02-11 01:00:00.007"];
db.query(sql2,param2,function(err, rows, fields) {
  if (err){
    console.log(err);
  }
  else{
    console.log(rows.insertId);
  }
});
*/
// db.end();