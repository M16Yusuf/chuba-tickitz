import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: [],
};

const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    addUser: (state, { payload }) => {
      state.users.push(payload.dataUser)
    },
    deleteUser: (state, { payload }) => {
      const index = state.users.findIndex((user) => {
        return user.email === payload.email;
      })
      state.users.splice(index, 1)
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;