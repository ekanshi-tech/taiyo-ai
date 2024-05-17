import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ReduxType } from '../../TS/Interfaces/redux.state.interface';
import { contactType } from '../../TS/Interfaces/contact.interface';
import ErrorComponent from '../../Components/ErrorComponent';

interface initialStateType {
  contact: contactType | null;
  noItemFound: boolean;
}

const initialState: initialStateType = {
  contact: null,
  noItemFound: false,
};

function ViewContactScreen() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const contacts = useSelector((state: ReduxType) => state.contacts);
  const ID = pathname.replace('/view-contact-screen/', '');

  const [{ contact, noItemFound }, setState] = useState(initialState);

  useEffect(() => {
    const contact = contacts.find(({ id }) => id === ID);

    if (contact)
      setState(prevData => ({
        ...prevData,
        contact,
      }));
    else setState(prevData => ({ ...prevData, noItemFound: true }));
  }, []);

  return !noItemFound ? (
    <div className="border border-[#999] p-6 rounded-xl flex flex-col">
      <Button className="mb-4 w-fit" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <div className="flex text-lg">
        <div className="w-[20%] text-blue-500">
          <div>ID: </div>
          <div>First Name: </div>
          <div>Last Name: </div>
          <div>Status Name: </div>
        </div>
        <div className="w-[80%]">
          <div> {contact?.id}</div>
          <div>{contact?.firstName}</div>
          <div>{contact?.lastName}</div>
          <div>{contact?.status}</div>
        </div>
      </div>
    </div>
  ) : (
    <ErrorComponent>
      <h1 className="mb-3">No Contact Found</h1>
      <Button onClick={() => navigate('/contacts-screen')}>
        Go Back to Contacts Screen
      </Button>
    </ErrorComponent>
  );
}

export default ViewContactScreen;
