// connectPython_print.js 파일

let movie = (name,img,date) => {
    return {
        name: name,
        img: img,
        date: date
    }
}

const spawn = require('child_process').spawn;

const result = spawn('python', ['index.py']);
let movieData = [];
result.stdout.on('data', function(data) {
    let a = data.toString().split('\n');
    for(let i =2; i < a.length; i += 3)
    {
        movieData.push(movie(a[i-2],a[i-1],a[i]));
        //console.log(`제목: ${a[i-2]}`);
        //console.log(`사진: ${a[i-1]}`);
        //console.log(`날짜: ${a[i]}`);
    }
});

result.stderr.on('data', function(data) {
    console.log(data.toString());
});

module.exports = movieData;