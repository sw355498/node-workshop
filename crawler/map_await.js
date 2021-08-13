function double(i) {
  return new Promise((resolove, reject) => {
    setTimeout(() => {
      resolove(i * 2);
      console.log(i);
    });
  }, 0);
}

let data2 = [1, 3, 5, 7];
data2 = data2.map(async (d) => {
  let result = await double(d);
  return result;
});
console.log("test 2: ", data2);


//當所有程式完成後，才顯示結果
Promise.all(data2).then((resolove)=>{
    console.log("Promise.all", resolove)
});