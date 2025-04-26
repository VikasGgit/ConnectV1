import { createSlice } from '@reduxjs/toolkit';


const refreshSlice = createSlice({
    name:"refresh",
    initialState:{
        refreshKey:false,
    },
    reducers:{
        ref:(state) => {
            state.refreshKey = !state.refreshKey;
        }
    }

});

export const {ref} = refreshSlice.actions;
export default refreshSlice.reducer;