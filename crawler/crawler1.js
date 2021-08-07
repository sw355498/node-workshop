// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210807&stockNo=2330&_=1628308672978

const axios = require("axios");
const moment = require("moment");

const fs = require("fs");
let stockCode = ""
fs.readFile("stock.txt", "utf-8", (err, stockCode) =>{
  axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
    params:{
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode,
    },
  })
  .then((response) => {
    console.log(response.data);
  })
})

