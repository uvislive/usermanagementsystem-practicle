// This File is Only For the Example 



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client, { API_BASE_URL, clientWithoutToken } from "../../api";
import {
  ACCESS_TOKEN,
  REFERENCE_TOKEN,
  saveToken,
} from "../../util/TokenAccess";
import { isExpired, decodeToken } from "react-jwt";
import { toast } from "react-toastify";

// Initial State
const initialState = {
  // user: {},
  loading: false,
  userInfo: {},
  userId: null,
  username: null,
  roleId: "",
  roleName: "",
  roleAdmin: false,
  sidebarIndex: 0,
  impUserDatails:{name:""},
};

// Async Thunks
// "user" is the slice name and "login" is a descriptive label for the specific async operation
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, thunkApi) => {
    try {
      const url = `${API_BASE_URL}/home/login`;
      const response = await clientWithoutToken.post(url, credentials);
      // when custome tost use
      // thunkApi.dispatch({
      //   type: AlertType.ALERT_SUCCESS,
      //   payload: { message: "Successfully logged In" },
      // });
      // toast.success("Successfully logged In");

      // store token in sessionStorage
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      saveToken(REFERENCE_TOKEN, refreshToken);
      saveToken(ACCESS_TOKEN, accessToken);
      return response;
    } catch (error) {
      const errorPayload = { message: error?.message };
      toast.error(errorPayload);
      // thunkApi.dispatch({ type: AlertType.ALERT_ERROR, payload: errorPayload });
      return thunkApi.rejectWithValue(error?.message || "An error occurred");
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/register",
  async (userData, thunkApi) => {
    try {
      const url = `${API_BASE_URL}/home/signup`;

      const formData = new FormData();
      const user = JSON.stringify(userData.user);
      const jsonBlob = new Blob([JSON.stringify(userData.user)], {
        type: "application/json",
      });
      // formData.append("user", new Blob([user], { type: "application/json" }));
      formData.append("user", jsonBlob);
      formData.append("identityProof", userData.identityProof);

      const response = await clientWithoutToken.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      // thunkApi.rejectWithValue({ error });
      const errorPayload = { message: error?.message };
      toast.error(errorPayload);
      // thunkApi.dispatch({ type: AlertType.ALERT_ERROR, payload: errorPayload });
      return error;
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (userData, thunkApi) => {
    const {credentials,isForgetEmail}=userData;
    try {
      const url =isForgetEmail?`${API_BASE_URL}/home/forgetEmail/genotpsms`:`${API_BASE_URL}/home/forgetPassword/genotpemail` ;
      const response = await clientWithoutToken.post(url, credentials, {
        // headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      // thunkApi.rejectWithValue({ error });
      const errorPayload = { message: error?.message };
      toast.error(errorPayload);
      // thunkApi.dispatch({ type: AlertType.ALERT_ERROR, payload: errorPayload });
      return error;
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // clear function for logout
    clearUser: (state) => {
      state.user = {};
      state.loading = false;
      state.userInfo = {};
      state.userId = null;
      state.username = null;
      state.roleId = "";
      state.roleName = "";
      state.roleAdmin = false;
    },

    setSideBarIndexValue: (state, action) => {
      state.sidebarIndex = action.payload;
    },
    setImpUserDetails:(state,action)=>{
        return {...state,impUserDatails:{...action.payload}}
    }
  },
  extraReducers: (builder) => {
    // login case handler
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const accesstoken = action.payload.data.accessToken;
        const decryptedToken = decodeToken(accesstoken);
        state.loading = false;
        // state.user = action.payload.data;
        state.userInfo = decryptedToken;
        state.userId = decryptedToken.jti;
        state.username = decryptedToken.iss;
        state.roleId = decryptedToken?.roles?.id;
        state.roleName = decryptedToken?.roles?.roles;
        state.impUserDatails.name=decryptedToken.iss;
        // set admin  or not
        decryptedToken?.roles?.id >= 15
          ? (state.roleAdmin = true)
          : (state.roleAdmin = false);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      });

    // registration handler
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { clearUser, setSideBarIndexValue,setImpUserDetails} = userSlice.actions;
export default userSlice.reducer;



// best example for copy pasting how slice works 