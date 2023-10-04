
import { createSlice } from '@reduxjs/toolkit';

const studentsSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      return state.filter(student => student.id !== action.payload);
    },
    setStudents: (state, action) => {
      return action.payload;
    },
  },
});

export const { addStudent, updateStudent, deleteStudent, setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
