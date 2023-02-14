import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "features/api";
import { toast } from "react-toastify";



const initialState = {
  token: "",
  user: '',
  error: "",
  loading: false,
  listCards: [],
  isLogin: false
};


export const login = createAsyncThunk("auth/login", async ({ values, navigate, setError }, { rejectWithValue }) => {

  try {
    const response = await api.post('/login', values, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const token = response?.data?.accessToken


    if (token) {
      navigate("/home/list-cards");
      toast.success("با موفقیت وارد شدید", {
        style: {
          fontFamily: "bYekan",
          direction: "rtl"
        },
      });
      setError('')

    } else {
      navigate('/')
    }

    return response?.data

  } catch (error) {
    if (error?.response?.status === 400) {
      setError("نام کاربری یا رمز عبور اشتباه است")
    }
    throw rejectWithValue(error?.response?.status)

  }

})



export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {

    logout(state, action) {
      localStorage.removeItem('persist:root')
    },

  },


  extraReducers: {

    [login.pending]: (state, action) => {
      state.loading = true
      state.isLogin = false
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.token = action.payload
      state.isLogin = true
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.isLogin = false
      state.error = action.payload
    }

  }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions
