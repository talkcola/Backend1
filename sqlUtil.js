const mysql = require("mysql");

module.exports = class SQLdb {
  #password;
  #db;
  constructor(host, database, port = "3000", user = "root", password = "") {
    this.host = host;
    this.database = database;
    this.port = port;
    this.user = user;
    this.#password = password;
    this.#Connect();
  }

  #Connect() {
    console.log("start Connect");
    try {
      let a = this.#password;
      this.#db = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: a,
        database: this.database,
        port: this.port,
      });
      this.#db.connect();
      //console.log(this.#db);
    } catch (error) {
      console.log(error);
    }
  }

  async GetAll() {
    try {
      console.log("1. getAll func exe");
      // return "100";
      const sqlCode = "SELECT * FROM comment_table";
      let data = [];
      await this.#db.query(sqlCode, (error, results, fields) => {
        if (error) throw error;
        data = results;
      });
      await setTimeout(() => {
        console.log(data);
      }, 1000);

      return data;
    } catch (error) {
      console.log("error");
    }
  }

  Disconnect() {
    this.#db.end();
  }
};

/*
const movieDB = new SQLdb(
  "svc.gksl2.cloudtype.app",
  "movie_db",
  "8080",
  "root",
  "0000"
);

console.log("start");
(async () => {
  console.log(await movieDB.GetAll());
})();
console.log("done");
*/
// async function PostCommentData(data) {
//   let sqlCode =
//     "INSERT INTO comment_table (comment_id, comment_des, comment_time) VALUES (?,?,?);";
//   let param = [data["nickname"], data["comment"], time];

//   let result = await (async () => {
//     await db.query(sqlCode, param, function (err, rows, fields) {
//       if (err) {
//         console.log(err);
//         throw err;
//       } else {
//         console.log(rows.insertId);
//       }
//       return 200;
//     });
//   })();

//   return result;
// }

// async function GetCommentData() {
//   const sqlCode = "SELECT * FROM comment_table";

//   await db.query(sqlCode, (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//     return results;
//   });
// }
