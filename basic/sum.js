console.log("Hello!")
/* 第一種寫法：for迴圈 */
function sum(x) {
    let result = 0;
    for (let i = 0; i <= x; i++) {
        result += i;
    }
    return result;
}


/* 第二種寫法：return搭配梯形面積的公式 */
function sum1(y){
    let resuult1 = 0;
    resuult1 = ((1+y)*y)/2;
    return resuult1
}
/* 第二種方法更好的寫法;不宣告變數直接使用return 執行 梯形面積的公式 */
function sum2(z){
    return ((1+z)*z)/2;
}

console.log("方法一結果：",sum(1),";方法二結果：",sum1(1),sum2(1))
console.log("方法一結果：",sum(3),";方法二結果：",sum1(3),sum2(3))
console.log("方法一結果：",sum(10),";方法二結果：",sum1(10),sum2(10))