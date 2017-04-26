var ini = require('ini');
var fs = require('fs');

exports.ReadWriteIni = class ReadWriteIni{
  constructor(iniFile = "./config.ini", encode = "utf-8"){
    this._iniFile = iniFile;
    this._encode = encode;
    this._iniFilePointer = ini.parse(fs.readFileSync(iniFile, encode))
  }

  get iniFilePath(){
    return this._iniFile;
  }

  set iniFilePath(path){
    this._iniFile = path;
  }

  get encode(){
    return this._encode;
  }

  set encode(encode){
    this._encode = encode;
  }

  get filePointer(){
    return this._iniFilePointer;
  }

  writeConfigToFile(config){
    fs.writeFileSync(this._iniFile, ini.stringify(config));
  }
}