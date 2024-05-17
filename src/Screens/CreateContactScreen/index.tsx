import Button from '../../Components/Button';
import Input from '../../Components/Input';
import RadioButton from '../../Components/RadioButton';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../Redux/Slices/contactSlices';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

const initialState = {
  firstName: '',
  lastName: '',
  status: '',
  buttonDisabled: true,
};
const radioButtonData = ['active', 'inactive'];

function ContactScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ firstName, lastName, status, buttonDisabled }, setState] =
    useState(initialState);

  const handleSubmit = () => {
    dispatch(addContact({ firstName, lastName, status, id: uniqid() }));
    navigate('/contacts-screen');
  };

  useEffect(() => {
    if (firstName && lastName && status)
      setState(prevData => ({ ...prevData, buttonDisabled: false }));
    else setState(prevData => ({ ...prevData, buttonDisabled: true }));
  }, [firstName, lastName, status]);

  return (
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

        <div className="mb-4 text-white">
          <p className="mb-4 text-xl text-white">Status</p>
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
        <Button disabled={buttonDisabled} onClick={handleSubmit}>
          Save Contact
        </Button>
      </div>
    </>
  );
}

export default ContactScreen;
