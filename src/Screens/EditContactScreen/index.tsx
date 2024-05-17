import Button from '../../Components/Button';
import Input from '../../Components/Input';
import RadioButton from '../../Components/RadioButton';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../Redux/Slices/contactSlices';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxType } from '../../TS/Interfaces/redux.state.interface';
import ErrorComponent from '../../Components/ErrorComponent';

const initialState = {
  firstName: '',
  lastName: '',
  status: '',
  noItemFound: false,
};

const radioButtonData = ['active', 'inactive'];

function EditContactScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const contacts = useSelector((state: ReduxType) => state.contacts);
  const ID = pathname.replace('/edit-contact-screen/', '');

  const [{ firstName, lastName, status, noItemFound }, setState] =
    useState(initialState);

  const handleSubmit = () => {
    dispatch(updateContact({ firstName, lastName, status, id: ID }));
    navigate('/contacts-screen');
  };

  useEffect(() => {
    const contact = contacts.find(contact => contact.id === ID);

    if (contact)
      setState(prevData => ({
        ...prevData,
        firstName: contact.firstName,
        lastName: contact.lastName,
        status: contact.status,
      }));
    else setState(prevData => ({ ...prevData, noItemFound: true }));
  }, []);

  return !noItemFound ? (
    <>
      <h1 className="mb-5 text-4xl text-white">Create Contact Screen</h1>
      <div className="border border-[#999] p-6 rounded-xl">
        <Input
          className="mb-4"
          label="First Name:"
          type="text"
          value={firstName}
          onChange={value =>
            setState(prevData => ({ ...prevData, firstName: value }))
          }
        />
        <Input
          value={lastName}
          type="text"
          label="Last Name:"
          className="mb-4"
          onChange={value =>
            setState(prevData => ({ ...prevData, lastName: value }))
          }
        />

        <div className="mb-4">
          <p className="mb-4 text-xl">Status</p>
          {radioButtonData.map(item => (
            <RadioButton
              key={item}
              className="mb-3"
              title={item}
              checked={status === item}
              onClick={() =>
                setState(prevData => ({ ...prevData, status: item }))
              }
            />
          ))}
        </div>
        <Button
          disabled={!(firstName && lastName && status)}
          onClick={handleSubmit}
        >
          Save Edited Contact
        </Button>
      </div>
    </>
  ) : (
    <ErrorComponent>
      <h1 className="mb-3">No Contact Found</h1>
      <Button onClick={() => navigate('/contacts-screen')}>
        Go Back to Contacts Screen
      </Button>
    </ErrorComponent>
  );
}

export default EditContactScreen;
