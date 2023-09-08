let fs = require('fs');

// readFileSync 동기처리

// console.log('A');
// let result = fs.readFileSync('syntax/sample.txt', 'utf8')
// console.log(result);
// console.log('C');


// readFile 비동기처리

console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', (error, result) => {
    console.log(result);
});
console.log('C');

// readFile이 실행되고 있을건데 그사이에 console.log('C')가 출력되어버림. readFile을 읽어보고 함수가 실행되고, console.log(result)가 처리된다.
