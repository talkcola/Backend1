const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const SQLdb = require("./sqlUtil.js");
require("date-utils");

var newDate = new Date();
var time = newDate.toFormat("YYYY-MM-DD HH24:MI:SS");

const port = 8080;

const app = express();

let gogo = async () => {
  let test = new SQLdb(
    "svc.gksl2.cloudtype.app",
    "movie_db",
    "30024",
    "root",
    "0000"
  );
  try {
    let a = await test.GetAll();
    console.log("a에 함수 할당을 시킴!", a);
    setTimeout(() => {
      console.log(a);
    }, 5000);
  } catch (error) {
    console.log("error message");
  }
};
gogo();
// connect mariadb

const db = mysql.createConnection({
  host: "svc.gksl2.cloudtype.app",
  user: "root",
  password: "0000",
  database: "movie_db",
  port: "30024",
});

db.connect();
const pic = [
  "https://t1.daumcdn.net/movie/703122e5e7642b0f0c1403aacda268d39b7aa406",
  "http://www.kyeongin.com/mnt/file/201901/20190119001456135_1.jpg",
  "https://post-phinf.pstatic.net/MjAxOTEyMjJfMTEw/MDAxNTc3MDE4MzcwNDY5.CMn8XNjrtiJHQ7bjNyNEpDMw0QS3RHpm3jJQzP2Io-sg.fiLeelTI2e9a9zE-VhLH9aiwNyE0wtQprhznq5GUU3gg.JPEG/home_alone_ver2_xlg.jpg?type=w1200",
  "https://img2.quasarzone.com/editor/2022/10/05/fbafcc80c8994542b94dbecde2d9f2dc.png",
  "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/03/108335687.1.jpg",
  "https://movie-phinf.pstatic.net/20220808_37/1659920688277bi8Ib_JPEG/movie_image.jpg?type=m665_443_2",
];

app.use(logger("dev"));

// app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, ""));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
//////
//////
//////
app.get("/", async (req, res) => {
  let json = await { ...pic };
  res.send(json);
});

async function GetCommentData() {
  const sqlCode = "SELECT * FROM comment_table";

  await db.query(sqlCode, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
}

app.get("/hello", async (req, res) => {
  let result = await GetCommentData();
  res.send(result);
});

// app.get("/hello", async (req, res) => {
//   const sql = "SELECT * FROM comment_table";

//   await db.query(sql, (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//     res.send(results);
//   });
// });

app.get("/getdata", (req, res) => {
  res.send({ hi: 3, bye: 5, everybody: 7 });
});

async function PostCommentData(data) {
  let sqlCode =
    "INSERT INTO comment_table (comment_id, comment_des, comment_time) VALUES (?,?,?);";
  let param = [data["nickname"], data["comment"], time];

  let result = await (async () => {
    await db.query(sqlCode, param, function (err, rows, fields) {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log(rows.insertId);
      }
      return 200;
    });
  })();

  return result;
}

app.post("/comment", async (req, res) => {
  res.send(await PostCommentData(req.body));
});

// app.post("/comment", (req, res) => {
//     let data = req.body;

//     let sql2 =
//       "INSERT INTO comment_table (comment_id, comment_des, comment_time) VALUES (?,?,?);";
//     let param2 = [data["nickname"], data["comment"], time];

//     (async () => {
//       await db.query(sql2, param2, function (err, rows, fields) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(rows.insertId);
//         }
//         res.send(200);
//       });
//     })();

//   console.log("query done");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("not found");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
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
