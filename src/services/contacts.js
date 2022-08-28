import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://630b5943f280658a59da0079.mockapi.io/api/phonebook',
});

export const getContacts = async () => {
  const { data } = await instance.get('/');
  return data;
};

export const deleteContact = async id => {
  const { data } = await instance.delete(`/${id}`);
  return data;
};

export const addNewContact = async newData => {
  const { data } = await instance.post('/', newData);
  return data;
};
