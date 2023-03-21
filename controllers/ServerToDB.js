const request = require("request-promise");

/*크롤링 데이터를 가져오는 함수*/
async function GetMovieDataFromServer() {
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

/* 출시 예정 영화 데이터를 가져와 db에 넣는 함수 */
async function AddMovieDataToDB() {
  /*
  - 이미 있는 영화 데이터는 추가해선 안된다. (중복 X)
*/
}

/*출시일이 지난 영화 데이터를 제거하는 함수*/
async function RemoveOldMovieData() {}

/*매일 한번 영화 Db에 관련된 데이터를 업데이트하는 함수*/
async function UpdateMovieDB() {
  AddMovieDataToDB();
  RemoveOldMovieData();
}

module.exports = UpdateMovieDB;
