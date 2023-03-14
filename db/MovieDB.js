const mysql = require("mysql2");
const SQLdb = require("./SQLdb");

class MovieDB extends SQLdb {
  constructor(host, database, port = "3000", user = "root", password = "") {
    super(host, database, port, user, password);
  }

  /*---------------------------------user---------------------------------*/

  /*---------------------------------movie---------------------------------*/

  async GetAllMovie() {
    const pic = [
      "https://t1.daumcdn.net/movie/703122e5e7642b0f0c1403aacda268d39b7aa406",
      "http://www.kyeongin.com/mnt/file/201901/20190119001456135_1.jpg",
      "https://post-phinf.pstatic.net/MjAxOTEyMjJfMTEw/MDAxNTc3MDE4MzcwNDY5.CMn8XNjrtiJHQ7bjNyNEpDMw0QS3RHpm3jJQzP2Io-sg.fiLeelTI2e9a9zE-VhLH9aiwNyE0wtQprhznq5GUU3gg.JPEG/home_alone_ver2_xlg.jpg?type=w1200",
      "https://img2.quasarzone.com/editor/2022/10/05/fbafcc80c8994542b94dbecde2d9f2dc.png",
      "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/03/108335687.1.jpg",
      "https://movie-phinf.pstatic.net/20220808_37/1659920688277bi8Ib_JPEG/movie_image.jpg?type=m665_443_2",
    ];
    let json = await { ...pic };
    return json;
  }

  async GetRandomMovie() {
    const pic = [
      "https://t1.daumcdn.net/movie/703122e5e7642b0f0c1403aacda268d39b7aa406",
      "http://www.kyeongin.com/mnt/file/201901/20190119001456135_1.jpg",
      "https://post-phinf.pstatic.net/MjAxOTEyMjJfMTEw/MDAxNTc3MDE4MzcwNDY5.CMn8XNjrtiJHQ7bjNyNEpDMw0QS3RHpm3jJQzP2Io-sg.fiLeelTI2e9a9zE-VhLH9aiwNyE0wtQprhznq5GUU3gg.JPEG/home_alone_ver2_xlg.jpg?type=w1200",
      "https://img2.quasarzone.com/editor/2022/10/05/fbafcc80c8994542b94dbecde2d9f2dc.png",
      "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/03/108335687.1.jpg",
      "https://movie-phinf.pstatic.net/20220808_37/1659920688277bi8Ib_JPEG/movie_image.jpg?type=m665_443_2",
    ];
    return pic[Math.floor(Math.random() * pic.length)];
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
