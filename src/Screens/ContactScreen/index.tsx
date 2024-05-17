import { useSelector, useDispatch } from 'react-redux';
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import { deleteContact } from '../../Redux/Slices/contactSlices';
import { contactType } from '../../TS/Interfaces/contact.interface';
import { ReduxType } from '../../TS/Interfaces/redux.state.interface';
import ErrorComponent from '../../Components/ErrorComponent';

function ContactScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector((state: ReduxType) => state.contacts);

  const contactItemButtons = [
    {
      title: 'View',
      onClick: (id: string) => navigate(`/view-contact-screen/${id}`),
    },
    {
      title: 'Edit',
      onClick: (id: string) => navigate(`/edit-contact-screen/${id}`),
    },
    { title: 'Delete', onClick: (id: string) => dispatch(deleteContact(id)) },
  ];

  return (
    <>
      <Button className="mb-6" onClick={() => navigate('/add-contact-screen')}>
        Create Contact
      </Button>
      <div className=" p-6 rounded-xl flex flex-wrap justify-center">
        {contacts.length ? (
          contacts.map(
            ({ firstName, lastName, id }: contactType, index: number) => (
              <div
                className="w-[30%] mb-5 mx-3 p-3 border border-gray-500 rounded-md"
                key={index}
              >
                <div className="w-full  mb-4 text-center font-Kalam text-5xl truncate">
                  {firstName +" "+ lastName}
                </div>
                {contactItemButtons.map(({ title, onClick }) => (
                  <Button
                    onClick={() => onClick(id)}
                    className="mb-3"
                    key={title}
                  >
                    {title}
                  </Button>
                ))}
              </div>
            ),
          )
        ) : (
          <ErrorComponent>
            <h1>No Contact Found</h1>
            <h1>Please Create Contact from Create Contact Button</h1>
          </ErrorComponent>
        )}
      </div>
    </>
  );
}

export default ContactScreen;
