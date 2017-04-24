const clien = require("./src/parse_site");
const config = require("./src/config");
var i = 1;

var infiniteLoop = () => {
  if (startParse.articles != undefined) {
    console.log('[KangLOG] pageData : ' + JSON.stringify(startParse.articles.get()));
    return false;
  }
  else {
    console.log('[KangLOG] undefined : ');
  }
  i++;
  if (i < 10) {
    myLoop();
  }
}

function myLoop() {
  setTimeout(infiniteLoop, 1000)
}

const startParse = new clien.ParseClien(config.jirum);
startParse.getJsonFromBody();
myLoop();