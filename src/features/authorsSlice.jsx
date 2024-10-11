import { createSlice } from '@reduxjs/toolkit';

const authorsSlice = createSlice({
    name: 'authors',
    initialState: [], 
    reducers: {
        setAuthors(state, action) {
            return action.payload; // Set =======================================
        },
        addAuthor(state, action) {
            state.push(action.payload); // Add =======================================
        },
        editAuthor(state, action) {        // Edit =======================================
            const { id, updatedAuthor } = action.payload;
            const index = state.findIndex(author => author.id === id);
            if (index !== -1) {
                state[index] = { ...state[index], ...updatedAuthor };
            }
        },
        deleteAuthor(state, action) {   //delete =======================================
            return state.filter(author => author.id !== action.payload);
        },
    },
});

export const { setAuthors, addAuthor, editAuthor, deleteAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
