const clien = require("./src/parse_site");
const url = require("./src/config");

const startParse = new clien.ParseClien(url.jirum);

var i = 1;                     //  set your counter to 1

var infiniteLoop = () => {    //  call a 3s setTimeout when the loop is called
  startParse.getJsonFromBody();          //  your code here
  if (startParse.articles != undefined) {
    console.log('[KangLOG] pageData : ' + JSON.stringify(startParse.articles.get()));
    return false;
    // console.log('[KangLOG]  : There is data');
  }
  else {
    console.log('[KangLOG] undefined : ');
  }
  i++;                     //  increment the counter
  if (i < 10) {            //  if the counter < 10, call the loop function
    myLoop();             //  ..  again which will trigger another 
  }                        //  ..  setTimeout()
}

function myLoop() {           //  create a loop function
  setTimeout(infiniteLoop, 3000)
}

myLoop();                      //  start the loop