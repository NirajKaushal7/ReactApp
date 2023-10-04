
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './studentsSlice';

const store = configureStore({
    reducer: {
        students:studentsReducer,
        //items: itemsReducer,//here the items is the name of all reducers in itemsSlice 
  },
});

export default store;
