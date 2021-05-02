import Obniz from "obniz";
import qs from "querystring";
import axios from "axios"
import  {LINE_API,OBNIZ_ID} from "./const.js"

var obniz = new Obniz(OBNIZ_ID);
const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';
const LINE_NOTIFY_TOKEN = LINE_API;
let config = {
  url: LINE_NOTIFY_API_URL,
  method: 'post',
  headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
     },
  data:qs.stringify( {message:"お湯がいっぱいだよ"} )
}

// called on online
obniz.onconnect = async function() {
  var waterLevelSensor = obniz.wired("Grove_WaterLevelSensor", { gnd:0 , vcc:1 , sda:2 , scl:3 });
  waterLevelSensor.onchange = function(value) {
    console.log(value);  // 0 mm - 100 mm
    if (value > 60) {
      axios.request(config).then(res=>console.log("success"))
    }
     }
};