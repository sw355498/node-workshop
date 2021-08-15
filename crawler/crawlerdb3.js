const axios = require("axios");
const moment = require("moment");
//fs內建讀檔案,不用npm,使用promises版
const fs = require("fs/promises");
const connection = require("./utils/db");
const { processStockDay } = require("./utils/TWSEDataProcessor");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });



(async () => {
  try {
    // 1.讀 stock.txt 把股票代碼讀進來
    let stockCode = await fs.readFile("stock.txt", "utf8");

    //console.log(stockCode);

    // 2.去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
    //await 等他連接好
    await connection.connectAsync();
    let dbResults = await connection.queryAsync(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stockCode]
    );
    //console.log(dbResults);
    if (dbResults === 0) {
      throw "此代碼不在我們的服務範圍內";
    }
    // 3.如果是，才去證交所抓資料
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
      }
    );
      //console.log(response)
    const twseData = response.data;
    if (twseData.stat !== "OK") {
      throw "從證交所查到的資料有問題";
    }
    let parseData = processStockDay(stockCode, twseData.data);

    // 4.抓回來的資料存到資料庫的 stock_price 表格裡去
    let results = await connection.queryAsync(
        "INSERT  IGNORE into stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) values ? ",
        [parseData]
      );
      console.log(results)
  } catch (e) {
    console.error(e);
  } finally {
    //關閉連線
    connection.end();
  }
})();