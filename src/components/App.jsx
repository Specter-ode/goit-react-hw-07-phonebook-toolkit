import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  removeContact,
  addContact,
} from '../redux/contacts/contacts-operations';
import { filterChange } from '../redux/contacts/contacts-actions';
import { getContacts, getFilterValue } from '../redux/contacts/contacts-selectors';
import Container from './Container/Container';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Spinner from '../components/Spinner/Spinner';

const App = () => {
  const contacts = useSelector(getContacts);

  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onAddContact = newContactData => {
    dispatch(addContact(newContactData));
  };

  const onRemoveContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const onChangeFilter = e => {
    dispatch(filterChange(e.target.value));
  };
  const { items, loading, error } = contacts;

  const getVisibleContacts = () => {
    if (filterValue) {
      return items.filter(contact => contact.name.toLowerCase().includes(filterValue));
    }
    return items;
  };

  return (
    <div>
      <Container>
        <Section title="Phonebook">
          <ContactForm catchSubmitInfo={onAddContact} />
        </Section>
        <Section title="Contacts">
          {loading && <Spinner />}
          {items.length > 0 ? (
            <>
              <Filter valueFromFilter={filterValue} catchFilterInfo={onChangeFilter} />
              <ContactList
                contacts={getVisibleContacts()}
                removeContact={onRemoveContact}
              />
            </>
          ) : (
            <p>No contacts in phonebook</p>
          )}
          {error && <p>{error.message}</p>}
        </Section>
      </Container>
    </div>
  );
};
export default App;
