const mysql = require("mysql2");
const SQLdb = require("./SQLdb");
const request = require("request-promise");

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request.get(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

class MovieDB extends SQLdb {
  constructor(host, database, port = "3000", user = "root", password = "") {
    super(host, database, port, user, password);
  }

  /*---------------------------------user---------------------------------*/

  /*---------------------------------movie---------------------------------*/

  async GetAllMovie() {
    let result = [];
    result = await request.get(
      "https://port-0-moviecrawl-9d7lbw2elczym3a7.gksl2.cloudtype.app/",
      function (error, res, body) {
        return body;
      }
    );

    result = JSON.parse(result);
    return result;
  }

  async GetRandomMovie() {
    let result = [];
    result = await request.get(
      "https://port-0-moviecrawl-9d7lbw2elczym3a7.gksl2.cloudtype.app/",
      function (error, res, body) {
        return body;
      }
    );

    result = JSON.parse(result);
    return result[Math.floor(Math.random() * result.length)];
  }

  async GetMovie(info = undefined) {
    if (info === undefined) {
      return await this.GetAllMovie();
    }
  }

  /*---------------------------------comment---------------------------------*/

  async GetAllComment() {
    try {
      const sqlCode = "SELECT * FROM comment_table";
      const [result, fields] = await this._promisePool.query(sqlCode);
      console.log("End Get Comment " + result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async GetRandomComment() {
    try {
      const sqlCode = "SELECT * FROM comment_table ORDER BY RAND() LIMIT 1";
      const [result, fields] = await this._promisePool.query(sqlCode);
      console.log("End Get Comment " + result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async GetComment(info = undefined) {
    if (info === undefined) {
      return await this.GetAllComment();
    } else {
      // info will have a many data such as date, movieType, etc
    }
  }

  async PostComment(data) {
    try {
      let sqlCode =
        "INSERT INTO comment_table (comment_id, comment_des, comment_time) VALUES (?,?,?);";
      let param = [data["nickname"], data["comment"], time];
      const { result } = await this._promisePool.query(sqlCode, param);
      return result;
    } catch (error) {
      return error;
    }
  }
}

let movieDB = new MovieDB(
  "svc.gksl2.cloudtype.app",
  "movie_db",
  "30024",
  "root",
  "0000"
);

module.exports = movieDB;
