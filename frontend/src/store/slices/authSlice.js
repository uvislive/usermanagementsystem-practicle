import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState={
    token:"",
    id:"",
    role:"",
    subAdminRoleId:"",
    isDarkMode:false
};


// async thunks 
// const asyncThunkname= Uvislive ;


// creating slice 
const authSlice= createSlice({
   name:"authenticatian",
    initialState,
    reducers:{
        setTokenData:(state,action)=>{
            console.log("action.payload",action.payload);
            return {...state,...action.payload};
        },
        setIsDarkMode:(state,action)=>{
            return {...state,isDarkMode:action.payload}
        }
    },
    extraReducers: (builder) => {
    //    any case handle 
        // builder
        //   .addCase(asyncThunkname.pending, (state) => {
        //     state.loading = true;
        //   })
        //   .addCase(asyncThunkname.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.user = action.payload;
        //   })
        //   .addCase(asyncThunkname.rejected, (state, action) => {
        //     state.loading = false;
        //   });
      },
})


// export reducer function
export const {setTokenData,setIsDarkMode } = authSlice.actions;

export default authSlice.reducer;