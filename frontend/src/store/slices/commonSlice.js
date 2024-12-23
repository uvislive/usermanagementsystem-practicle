
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState={
    isDarkMode:false
}


// creating slice 
const commonSlice= createSlice({
    name:"commonSlice",
     initialState,
     reducers:{
        changeTheme:(state,action)=>{
            // console.log("action payload",action.payload)
             return {...state,isDarkMode:action.payload};
         }
     }
 })


 export const { changeTheme} = commonSlice.actions;

 export default commonSlice.reducer