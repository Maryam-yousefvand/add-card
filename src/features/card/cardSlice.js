import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "features/api";
import { toast } from "react-toastify";

const initialState = {
    listCards: [],
    addCard: [],
    loading: false,
    error: "",
    deleteCard: false

};

export const addCard = createAsyncThunk('card/addCard', async ({ values, resetForm }) => {
    try {
        const response = await api.post('/addCard', values)
        toast.success("کارت با موفقیت ثبت شد", {
            style: {
                fontFamily: "vazir",
                direction: "rtl"
            },
        });
        resetForm()

        // setSelectOption('')
        return response?.data

    } catch (error) {
        console.log(error);
    }

})

export const getListCards = createAsyncThunk('card/getListCards', async () => {
    try {
        const response = await api.get('/addCard')
        return response?.data
    } catch (error) {
        console.log(error);
    }

})


export const deleteCard = createAsyncThunk('card/deleteCard', async ({ cardId, setShowDeleteCard, dispatch }) => {
    try {
        const response = await api.delete(`/addCard/${cardId}`)
        toast.success("کارت با موفقیت حذف شد", {
            style: {
            }
        })
        setShowDeleteCard(false)
        dispatch(getListCards());

        return response?.data

    } catch (error) {
        console.log(error);
    }

})



export const cardSlice = createSlice({
    name: 'card',
    initialState,

    extraReducers: {

        [addCard.pending]: (state, action) => {
            state.loading = true
        },
        [addCard.fulfilled]: (state, action) => {
            state.loading = false
            state.addCard = action.payload
        },
        [addCard.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [getListCards.pending]: (state, action) => {
            state.loading = true
        },
        [getListCards.fulfilled]: (state, action) => {
            state.loading = false
            state.listCards = action.payload
        },
        [getListCards.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        [deleteCard.pending]: (state, action) => {
            state.loading = true
            state.deleteCard = false
        },
        [deleteCard.fulfilled]: (state, action) => {
            state.loading = false
            state.deleteCard = true
        },
        [deleteCard.rejected]: (state, action) => {
            state.loading = false
            state.deleteCard = false
            state.error = action.payload
        },

    }
})



export default cardSlice.reducer