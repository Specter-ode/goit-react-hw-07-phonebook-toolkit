import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const ContactForm = ({ catchSubmitInfo }) => {
  const [state, setState] = useState({
    name: '',
    phone: '',
  });
  const clearFields = () => {
    setState({
      name: '',
      phone: '',
    });
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    catchSubmitInfo({ ...state });

    clearFields();
  };
  const { name, phone } = state;
  const isActive = name && phone;
  console.log('isDisable: ', isActive);
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          className={s.input}
        />
        Name
      </label>
      <label className={s.label}>
        <input
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          className={s.input}
        />
        Phone number
      </label>

      <button type="submit" disabled={!isActive} className={s.btn}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  catchSubmitInfo: PropTypes.func.isRequired,
};
export default ContactForm;
