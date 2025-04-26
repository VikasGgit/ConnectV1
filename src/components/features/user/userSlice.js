import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    password:"",
    gender:"",
    role:""
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userData:(state, action) => {
            const {firstName, lastName, email, phone, password,gender, role} = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.phone = phone;
            state.password = password;
            state.gender = gender;
            state.role = role;
        }
        
    }
});
export const {userData} = userSlice.actions;
export default userSlice.reducer;