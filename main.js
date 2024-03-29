const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const schedule = require("node-schedule");

const movieDB = require("./db/MovieDB");
const movieRouter = require("./routes/movie");
const commentRouter = require("./routes/comment");
const UpdateMovieDB = require("./controllers/ServerToDB");
//const userRouter = require("./routes/user");

require("date-utils");

var newDate = new Date();
var time = newDate.toFormat("YYYY-MM-DD HH24:MI:SS");

const port = 3000;

const app = express();

app.use(logger("dev"));

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, ""));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

UpdateMovieDB();
const job = schedule.scheduleJob("0 1 0 * * *", function () {
  UpdateMovieDB();
});

///
app.use("/movie", movieRouter);
app.use("/comment", commentRouter);

app.get("/", async (req, res) => {
  res.send("Wellcome to console.log's movie database");
});

app.get("/test", async (req, res) => {
  console.log("실험용");
  let result = await movieDB.GetAllComment();
  console.log(result);
  res.send(result);
});

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
