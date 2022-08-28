import { getContacts, deleteContact, addNewContact } from '../../services/contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, thunkAPI) => {
  try {
    const result = await getContacts();
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addContact = createAsyncThunk(
  'contacts/add',
  async (data, thunkAPI) => {
    try {
      const result = await addNewContact(data);

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      const isDublicate = contacts.items.find(
        item => item.name.toLowerCase() === data.name.toLowerCase()
      );
      if (isDublicate) {
        alert(`${data.name} is already in contacts`);
        return false;
      }
    },
  }
);

export const removeContact = createAsyncThunk('contacts/remove', async (id, thunkAPI) => {
  try {
    const result = await deleteContact(id);
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
