//Task 1
const http = require('http');
const os = require('os');
const path = require('path');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-type': 'text/html'});
    let renderData = `
        <h1>System information</h1>
        <div>Current user name: ${os.userInfo().username}</div>
        <div>OS type: ${os.type}</div>
        <div>System work time: ${os.uptime} minutes</div>
        <div>Current work directory: ${path.dirname(__dirname)}</div>
        <div>Server file name: ${path.basename(__filename)}</div>
    `;
    response.end(renderData);
}).listen(5000);

console.log('Server had run at port http://127.0.0.1:5000/');


//Task 2
// const greet = require('./personalmodule');
// const http = require('http');
// const os = require('os');

// http.createServer((request, response) => {
//     response.writeHead(200, {'Content-type': 'text/html'});
//     response.end(greet.greetUser(os.userInfo().username));
// }).listen(5000);

// console.log('Server had run at port http://127.0.0.1:5000/');