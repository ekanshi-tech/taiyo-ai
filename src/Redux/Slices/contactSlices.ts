import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { contactType } from '../../TS/Interfaces/contact.interface';

const initialState: contactType[] = [];

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<contactType>) => {
      state.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<contactType>) => {
      let i = 0;
      for (const item of state) {
        if (item.id === action.payload.id) {
          state[i] = action.payload;
          break;
        }
        i++;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      let i = 0;
      for (const item of state) {
        if (item.id === action.payload) {
          state.splice(i, 1);
          break;
        }
        i++;
      }
    },
  },
});

export const { addContact, updateContact, deleteContact } =
  contactSlice.actions;

export default contactSlice.reducer;
