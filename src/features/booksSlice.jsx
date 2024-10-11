import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    
    setBooks: (state, action) => { // set Book =======================================
      return action.payload; 
    },
    addBook: (state, action) => { // add Book =======================================
      state.push(action.payload); 
    },
    editBook: (state, action) => { // edit Book =======================================
      const { id, updatedBook } = action.payload;
      const index = state.findIndex(book => book.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedBook }; 
      }
    },
    deleteBook: (state, action) => { // delete Book =======================================
      return state.filter(book => book.id !== action.payload); 
    },
  },
});

export const { setBooks, addBook, editBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;
