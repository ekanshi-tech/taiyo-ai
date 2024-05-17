import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import RouteList from './Routes';
import 'leaflet/dist/leaflet.css';

interface SideBarListType {
  title: string;
  path: string;
  matchPaths?: string[];
}

const sideBarList: SideBarListType[] = [
  {
    title: 'Contacts',
    path: '/contacts-screen',
    matchPaths: ['/contacts-screen', '/add-contact-screen'],
  },
  {
    title: 'Charts and Maps',
    path: '/charts-and-maps',
    matchPaths: ['/charts-and-maps'],
  },
];

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="w-screen h-screen bg-[#070707]">
      <div className="h-[100%] flex">
        <div className="w-[350px] min-w-fit border-r border-white py-10 px-3">
          {sideBarList.map(({ title, path, matchPaths }) => (
            <div
              onClick={() => navigate(path)}
              className={`w-full rounded-lg px-4 py-2 my-6 font-medium text-white hover:bg-[#3a6ebd] ${
                matchPaths?.includes(pathname) && 'bg-[#578fe3]'
              } `}
              key={title}
            >
              {title}
            </div>
          ))}
        </div>

        <div className="px-10 py-10 overflow-auto grow">
          <Routes>
            {RouteList.map(({ path, Element, redirectTo }) => (
              <Route
                key={path}
                path={path}
                element={redirectTo ? <Navigate to={redirectTo} /> : Element}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
