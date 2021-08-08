// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210807&stockNo=2330&_=1628308672978

const axios = require("axios");
const moment = require("moment");

const fs = require("fs");
let stockCode = ""


new Promise ((resolve,reject) => {
  fs.readFile("stock.txt", "utf-8", (err, stockCode) =>{
    if (err){
        reject(err);
    }
    else{
        resolve(stockCode.trim());
    }
  })
})
.then((stockCode)=>{
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
    params:{
    response: "json",
    date: moment().format("YYYYMMDD"),
    stockNo: stockCode,
    },
  })    
})
.then((response) => {
  console.log(response.data);
  })
.catch((error) =>{
  console.log(error)
});







// new Promise ((resolve,reject) => {
//     fs.readFile("stock.txt", "utf-8", (err, stockCode) =>{
//       if (err){
//           reject(err);
//       }
//       else{
//           resolve(stockCode);
//       }
//     })
//   })
//   .then((stockCode)=>{
//     axios
//       .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
//         params:{
//           response: "json",
//           date: moment().format("YYYYMMDD"),
//           stockNo: stockCode,
//         },
//       })
//       .then((response) => {
//       console.log(response.data);
//       });
//   })
//   .catch((error) =>{
//     console.log(error)
//   });