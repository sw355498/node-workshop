// 請問下列程式碼印出的順序為何？

function syncF() {
    console.log(1);
  
    setTimeout(() => {
      console.log(2);
    }, 0);
    console.log(3);
  }
  
  console.log(4);
  syncF();
  console.log(5);

  /*執行結果 4 -> 1 -> 3 -> 5 -> 2 
    執行順序：
    1.console.log(4);
    2.syncF();
        1.console.log(1);
        2.console.log(3);
        *console.log(2);會先到node.js底層接著在Queque等待
    3.console.log(5);
    4.console.log(2)(evnt loop檢查到stack內空了，將在Queque等待的console.log(2)搬運到stack執行)

  */