const express = require("express");

// 利用 express 建立了一個 express application
let app = express();

// app.use 使用一個中間件
app.use((req, res ,next) => {
  let current = new Date();
  console.log(`訪客已經入，登入時間 ${current.toISOString()}`)
  next()
})

app.use((req, res ,next) => {
  console.log("訪客使用中")
  next()
})

// HTTP Method: get, post, put, patch, delete
// router 路由 -> 特殊的中間件會去比對網址
app.get("/", function (request, response, next) {
  response.send("Hello");
});

app.get("/about", function (request, response, next) {
  response.send("這裡是about");
});

app.listen(3000, function () {
  console.log("我們的 web server 啟動了～");
});

