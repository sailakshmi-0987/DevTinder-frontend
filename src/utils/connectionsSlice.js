import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name:"connections",
    initialState:[],
    reducers:{
        addconnections:(state,action)=>action.payload,
    
        // eslint-disable-next-line no-unused-vars
        removeconnections:(state,action)=>{
            return null;
        }
    }
});

export const {addconnections}=connectionsSlice.actions;
export default connectionsSlice.reducer;