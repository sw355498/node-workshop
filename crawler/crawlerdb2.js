// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210807&stockNo=2330&_=1628308672978

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
const { resolve } = require("path");

/* 只需要require */
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

/* 讀 stock.txt 把股票代碼讀進來 */
function readStockcodePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
      if (err) {
        reject(err);
      } else {
        // trim 移除前後的空白字元，包括換行
        resolve(stockCode.trim());
      }
    });
  });
}

/* 抓取證交所資料 */
function querysStockPricePromise(stockCode){
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
    params:{
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode,
    },
  }); 
}

/* 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內 */
function querStockCodePromise(stockCode) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stockCode],
      function (error, results, fields) {
        if (error) {
          //錯誤
          reject(error);
        }
        //正確
        resolve(results);
      }
    );
  });
}

/* 抓回來的資料存到資料庫的 stock_price 表格裡去 */
function insertStockData(parsedData) {
  return new Promise((resolve, reject) => {
      connection.query(
          "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?", // IGNORE 忽略重複部分
          [parsedData],
          function (error, results, fields) {
              if (error) {
                  reject(error);
              }
              resolve(results);
          }
      );
  });
}

async function doWork(){
  try{
    /* 讀 stock.txt 把股票代碼讀進來 */
    let stockCode = await readStockcodePromise();

    /* 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內 */
    let dbcheck = await querStockCodePromise(stockCode);
    if (dbcheck.length === 0) {
      console.warn("此股票號碼不在資料庫內");
      return;
    }
    /* 如果是，才去證交所抓資料 */
    console.log('有查詢到資料')
    let response = await querysStockPricePromise(stockCode)
    
    /* 確認證交所查到的資料是否有問題 */
    const twseData = response.data;
    if(twseData.stat !=="OK"){
      throw "從證交所查到的資料有問題"
    }

    /* 處理日期 */
    /* 改西元年(資料庫都是西元年) 拿掉/, 轉成int, +1911 */
    let parseData = twseData.data.map((item) => {
      item = item.map((value) => {
        return value.replace(/,/g, "");
      });
      item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
      //插入stock_id
      item.unshift(stockCode);
      return item;
    });
    console.log(parseData);

    let insertResult = await insertStockData(parseData);
    console.log(insertResult);
    
  }catch(e){
    console.log(e);
  }finally{
  /* 不管成功與失敗都需要關閉資料庫連線 */
  connection.end();
  }
}
doWork()