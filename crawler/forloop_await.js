function double(i) {
  return new Promise((resolove, reject) => {
    setTimeout(() => {
      resolove(i * 2);
      console.log(i);
    });
  }, 0);
}

(async () => {
    let data1 = [1, 3, 5, 7];
    for (let i= 0; i <data1.length; i++){
        data1[i] =await double(data1[i]);
    }
    console.log("test 1: ",data1);
})();

/* https://www.notion.so/for-loop-map-forEach-cd6aea13ba194da6a8ab18f9f594c3bb */