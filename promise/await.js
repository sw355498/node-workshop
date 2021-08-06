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


async function doWorking(){
  let job1 = await doWork("刷牙", 3000, true);
  console.log(job1);
  let job2 = await doWork("吃早餐", 5000, true);
  console.log(job2);
  let job3 = await doWork("寫功課", 3000, true);
  console.log(job3);
}
doWorking()