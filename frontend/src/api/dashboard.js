import apiClient from "./apiClient";

export const fetchSeachStockSuggestion = async (data) => {
    const res = await apiClient.get(`/search?name=${data}`);    
    return res;
//   }
}


export const fetchStockCurrentDetail = async (stockName, period, timeInterval) => {
    const res = await apiClient.get(`/fetch-stock-data?ticker=${stockName}&period=${period}&timeInterval=${timeInterval}`);    
    return res;
}


export const fetchStockRecommendationAPI = async(stockName) => {
   const res = await apiClient.get(`/recommendation?symbol=${stockName}`);
   return res;
}
  
export const fetchStockPredictData = async(stockName, date) => {
  const res = await apiClient.get(`/predict?ticker=${stockName}&date=${date}`);
   return res;
}

export const fetchStockComparisonData = async(symbol, peers) => {
    const res = await apiClient.get(`/stock-performance?symbol=${symbol}&peers=${peers}`);
     return res;
  }