//twseData.data -> rawData 為處理過(生)的資料
function processStockDay(stockCode, rawData) {
    return rawData.map((item) => {
      item = item.map((value) => {
        return value.replace(/,/g, "");
      });
      item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
      item.unshift(stockCode);
      return item;
    });
  }
  
  module.exports = {
    processStockDay,
  };