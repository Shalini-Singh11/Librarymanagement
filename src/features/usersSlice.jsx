import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {                 // set User =============================
      return action.payload; 
    },
    addUser(state, action) {                  //add User =============================
      state.push(action.payload); 
    },
    editUser(state, action) {                 //edit User =============================
      const { id, updatedUser } = action.payload;
      const index = state.findIndex(user => user.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedUser }; 
      }
    },
    deleteUser(state, action) {               //delete User =============================
      return state.filter(user => user.id !== action.payload); 
    },
  },
});

export const { setUsers, addUser, editUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
