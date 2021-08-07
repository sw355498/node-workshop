async function asyncF() {
    console.log(1);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(2);
        resolve();
      }, 0);
    });
    console.log(3);
  }
  
  console.log(4);
  asyncF();
  console.log(5);


  /*執行結果 4 -> 1 -> 5 -> 2 -> 3 
    執行順序：
    1.console.log(4);
    2.syncF();
        1.console.log(1);
        *console.log(2)//會先到web api接著在Queque等待
        *console.log(3)//因console.log(2)使用了await,在Promise結束前後面的程式都無法被執行
    3.console.log(5);
    4.console.log(2)//evnt loop檢查到stack內空了，將在Queque等待的console.log(2)搬運到stack執行)
    5.console.log(3)//Promise程式結束console.log(3)依照順序繼續執行

  */