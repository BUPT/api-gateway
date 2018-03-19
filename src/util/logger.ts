import * as log4js from "log4js";
import * as path from "path";

let filename = path.join(__dirname, "../../log/")
log4js.configure({
  appenders: { info: { type: 'file', filename: path.join(filename, "operation.log") } },
  categories: { default: { appenders: ['info'], level: 'info' } },
});


export const getLogger = function(){
    return log4js.getLogger();
}

