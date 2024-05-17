import ChartsAndMapsScreen from '../Screens/ChartsAndMapsScreen';
import ContactScreen from '../Screens/ContactScreen';
import CreateContactScreen from '../Screens/CreateContactScreen';
import EditContactScreen from '../Screens/EditContactScreen';
import ViewContactScreen from '../Screens/ViewContactScreen';
interface RouteTypes {
  path: string;
  Element?: React.ReactNode | null;
  redirectTo?: string;
}

const Routes: RouteTypes[] = [
  { path: '/contacts-screen', Element: <ContactScreen /> },
  { path: '/add-contact-screen', Element: <CreateContactScreen /> },
  { path: '/edit-contact-screen/:id', Element: <EditContactScreen /> },
  { path: '/view-contact-screen/:id', Element: <ViewContactScreen /> },
  { path: '/charts-and-maps', Element: <ChartsAndMapsScreen /> },

  { path: '*', redirectTo: '/contacts-screen' },
];

export default Routes;
