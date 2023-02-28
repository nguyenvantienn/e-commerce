import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebarControl',
    initialState:{
        isSidebarShow :false,
    },
    reducers:{
        setSidebarOn :(state,action) =>{
            state.isSidebarShow = action.payload;
        },

        setSidebarOff: (state) =>{
            state.isSidebarShow = false
        }
    },
});

export const {setSidebarOff , setSidebarOn} = sidebarSlice.actions;
//De lay gia tri cua InitialState
// export const getSidebarStatus = (state) =>state.sidebarControl.isSidebarShow

export default sidebarSlice.reducer;