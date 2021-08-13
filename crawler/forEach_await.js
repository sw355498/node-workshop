function double(i) {
  return new Promise((resolove, reject) => {
    // setTimeout(() => {
      resolove(i * 2);
      console.log("i: ",i);
    // });
  }, 0);
}

let data3 = [1, 3, 5, 7];
data3.forEach(async(d, i)=>{
    data3[i] = await double(d);
});
console.log("test 3: ",data3)

