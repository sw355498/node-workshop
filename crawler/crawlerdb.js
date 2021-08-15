// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210807&stockNo=2330&_=1628308672978

const axios = require("axios");
const moment = require("moment");
const mysql = require("mysql");
const fs = require("fs");
// const {readFile} = require("fs");
// fs.readFile("stock.txt", "utf8", callback)
const { resolve } = require("path");
require("dotenv").config();
let stockCode = ""

/* 設定連線資料 */
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/* 準備連線 */
connection.connect((err) => {
  if (err){
    console.log("資料庫連線失敗")
  }
});



async function resultStock(){
  /* 第一步 讀 stock.txt 把股票代碼讀進來 */
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
    
    /* 第二步 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內(callback版) */
    // connection.query(
    //   "SELECT * FROM stock WHERE stock_id = ?", 
    //   [stockCode], 
    //   function (error, results, fields) {
    //     if (error) throw error;
    //     if (results.length === 0){
    //       console.log("查無此代碼")
    //     }
    //     console.log("有資料",results);
    //   });

    /* 第二步 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內(promise -> async) */
    let results = await new Promise((resolve,reject) => {
      connection.query(
        "SELECT * FROM stock WHERE stock_id = ?", 
        [stockCode], 
        function (error, results, fields) {
          if (error){
            reject(error)
          };
          if (results.length === 0){
            console.log("查無此代碼")
          }else{
            resolve(results);
          }
        });
    });
    console.log(results);
    
    //     let result = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
    //         params:{
    //           response: "json",
    //           date: moment().format("YYYYMMDD"),
    //           stockNo: stockCode,
    //         },
    //     }); 
    
    //     console.log(result.data);
  }catch(e){
        console.log(e);
  }finally{
    /* 不管成功與失敗都需要關閉資料庫連線 */
    connection.end();
  }
}
resultStock()