let doWork = function (job, timer, isOK) {
    return new Promise((resolve, reject) => {
      console.log("in promise");
      setTimeout(() => {
        let dt = new Date();
        if (isOK) {
          resolve(`完成工作: ${job} at ${dt.toISOString()}`);
        } else {
          reject(`失敗了 ${job}`);
        }
      }, timer);
    });
  };
  
  let dt = new Date();
  console.log(`開始工作 at ${dt.toISOString()}`);
  // 刷牙 -> 吃早餐 -> 寫功課
  
/* 寫法一 */
//   //刷牙
//   let job1 = doWork("刷牙", 3000, true);
//   console.log(job1);
//   job1.then(
//     function (resolve) {
//       console.log("第 1 個函式被呼叫了", resolve);
//     },
//     function (reject) {
//       console.log("第 2 個函式被呼叫了", reject);
//     }
//   );
  
//   let job2 = doWork("吃早餐", 5000, true);
//   console.log(job2);
//   job2.then(
//     function (resolve) {
//       console.log("第 1 個函式被呼叫了", resolve);
//     },
//     function (reject) {
//       console.log("第 2 個函式被呼叫了", reject);
//     }
//   );
  
//   let job3 = doWork("寫功課", 3000, true);
//   console.log(job3);
//   job3.then(
//     function (resolve) {
//       console.log("第 1 個函式被呼叫了", resolve);
//     },
//     function (reject) {
//       console.log("第 2 個函式被呼叫了", reject);
//     }
//   );

/* 寫法二 */
let job1 = doWork("刷牙", 3000, true);
console.log(job1);
  job1
    .then(function (resolve){
      console.log("第 1 個函式被呼叫了", resolve);
      let job2 = doWork("吃早餐", 5000, true);
      return job2
    })
    .then(function (resolve){
        console.log("第 1 個函式被呼叫了", resolve);
        let job3 = doWork("寫功課", 3000, true);
        return job3
    })
    .then(function (resolve){
        console.log("第 1 個函式被呼叫了", resolve);
    })
    .catch(function (reject){
      console.log("第 2 個函式被呼叫了", reject);
    })
    .finally(function(){
        // 無論成功或失敗都會在這裡
        console.log("finally");
    });

// let p2 = job1.then(function (){
//     //處理成功
// });

// p2.catch(function(){

// });

// let p3 = p2.catch(function(){});