const clien = require("./src/parse_site");
const url = require("./src/config");

const startParse = new clien.ParseClien(url.jirum);

startParse.getJsonFromBody();
// var i = 1;                     //  set your counter to 1

// function myLoop () {           //  create a loop function
//    setTimeout(function () {    //  call a 3s setTimeout when the loop is called
//       alert('hello');          //  your code here
//       i++;                     //  increment the counter
//       if (i < 10) {            //  if the counter < 10, call the loop function
//          myLoop();             //  ..  again which will trigger another 
//       }                        //  ..  setTimeout()
//    }, 3000)
// }

// myLoop();                      //  start the loop