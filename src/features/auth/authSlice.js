import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "features/api";
import { toast } from "react-toastify";

const initialState = {
  user: '',
  error: "",
  loading: false,
  listCards: []
};



export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login(state, action, navigate) {
      localStorage.setItem('token', JSON.stringify(action.payload.username))
      state.user = action.payload.username


    },
    logout(state, action) {
      localStorage.removeItem('token')
    },


    addCard(state, action) {

      state.listCards = [...state.listCards, action.payload]

    },
    removeCard(state, action) {
      state.listCards = state.listCards.filter((card, index) => index !== action.payload)
    }


  },


  extraReducers: {

  },
});

export default authSlice.reducer;
export const { login, logout, addCard, removeCard } = authSlice.actions
