import Obniz from "obniz";
import qs from "querystring";
import axios from "axios"
import  {LINE_NOTIFY_API_URL,LINE_NOTIFY_TOKEN,OBNIZ_ID} from "./const.js"

const obniz = new Obniz(OBNIZ_ID);
const config = {
  url: LINE_NOTIFY_API_URL,
  method: 'post',
  headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
     },
  data:qs.stringify( {message:"お湯がいっぱいだよ"} )
}

// called on online
obniz.onconnect = async ()=> {
  const waterLevelSensor = obniz.wired("Grove_WaterLevelSensor", { gnd:0 , vcc:1 , sda:2 , scl:3 });
  waterLevelSensor.onchange = (value)=> {
    console.log(value);  // 0 mm - 100 mm
    if (value > 60) {
      axios.request(config).then(res=>console.log(res))
    }
  }
};