console.log("index")
/* 引入car */
let car = require("./car")
console.log("我是car之後")
/* 引入car2 */
let car2 = require("./car2")
console.log("我是car2之後")

console.log(car2.getOwner())

/* 引入phone */
// let phone = require("./phone")


// console.log(phone)
// console.log(phone.showBrand())
// console.log(phone.showModel())
// console.log(phone.showSize())
// console.log(phone.showColor())
// console.log(phone.showCapacity())
// console.log(phone.showPrice())