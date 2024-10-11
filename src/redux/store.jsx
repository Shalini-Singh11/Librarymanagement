import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice';
import usersReducer from '../features/usersSlice';
import authorsReducer from '../features/authorsSlice';
import loginReducer from '../features/loginSlice';
import registerReducer from "../features/registerSlice";
 

const store = configureStore({
  reducer: {
    books: booksReducer,
    users: usersReducer,
    authors: authorsReducer, 
    auth: loginReducer, 
    register: registerReducer,
  },
});

export default store;
