import apiClient from "./apiClient"

export const fetchTest = async() => {
  const res = await apiClient.get();    
  return res;
}


export const createUser = async(data) => {
    const res = await apiClient.post("/users", data);
    return res;
}