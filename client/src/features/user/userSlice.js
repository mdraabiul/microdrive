import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
  },
  reducers: {
    addUser: (state,action) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
