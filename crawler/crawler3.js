// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210807&stockNo=2330&_=1628308672978
/* await版 第一種寫法 */
const axios = require("axios");
const moment = require("moment");

const fs = require("fs");
let stockCode = ""

async function resultStock(){
  let stockCode = await new Promise ((resolve,reject) => {
    fs.readFile("stock.txt", "utf-8", (err, stockCode) =>{
      if (err){
          reject(err);
      }
      else{
          resolve(stockCode.trim());
      }
    })
  })

  try{
    let result = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
        params:{
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
    }); 

    console.log(result.data);
  }catch(e){
    console.log(e);
  }
}
resultStock()


/* await版 第二種寫法 */
// const axios = require("axios");
// const moment = require("moment");
// const fs = require("fs");

// function resultPromise() {
//   return new Promise((resolve, reject) => {
//     fs.readFile("stock.txt", "utf8", (error, stockCode) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(stockCode);
//       }
//     });
//   });
// }
// function resultAxios(stockCode) {
//   return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//     params: {
//       response: "json",
//       date: moment().format("YYYYMMDD"),
//       stockNo: stockCode,
//     },
//   });
// }

// (async function () {
//   try {
//     let stockCode = await resultPromise();
//     let response = await resultAxios(stockCode);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// })();