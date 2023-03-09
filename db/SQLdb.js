const mysql = require("mysql2");

module.exports = class SQLdb {
  #password;
  _pool;
  _promisePool;
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
      console.log("start to Connect DB");
      let a = this.#password;
      this._pool = mysql.createPool({
        host: this.host,
        user: this.user,
        password: a,
        database: this.database,
        port: this.port,
      });
      this._promisePool = this._pool.promise();
      console.log("End to Connect DB");
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllTable() {
    try {
      const { result } = await this._promisePool.query("SHOW TABLES");
      return result;
    } catch (error) {
      console.log(error);
    }
  }
};
