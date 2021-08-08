// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210807&stockNo=2330&_=1628308672978
/* await版 第一種寫法 */
const axios = require("axios");
const moment = require("moment");
const mysql = require("mysql");
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

  /* 連線資料庫 */
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err){
      console.log("資料庫連線失敗")
    }
  });
  connection.end();
//   try{
//     let result = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
//         params:{
//           response: "json",
//           date: moment().format("YYYYMMDD"),
//           stockNo: stockCode,
//         },
//     }); 

//     console.log(result.data);
//   }catch(e){
//     console.log(e);
//   }
}
resultStock()