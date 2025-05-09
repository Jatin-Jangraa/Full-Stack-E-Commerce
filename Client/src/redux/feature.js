import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    user :null,
    userid :null,
    islogined:false,
    name:null,
}

const counterSlice = createSlice({
    name :'counter',
    initialState,
    reducers:{
        logininto :(state,action)=>{
            state.user = action.payload.user;
            state.userid = action.payload.userid;
            state.islogined = true
            state.name = action.payload.name
        },
        logout : (state)=>{
            state.user = null;
            state.userid = null;
            state.islogined = false}
        
    }
})


export const  {logininto,logout}  = counterSlice.actions;

export default counterSlice.reducer;

