//  Reducers are functions that specify how the application's state should change
//  in response to actions this booksSlice.reducer returns booksReducer
import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    setBooks: (state, action) => {
      return action.payload;
    },
  },
});

export const { addBook, updateBook, deleteBook, setBooks } = booksSlice.actions;
export default booksSlice.reducer;
