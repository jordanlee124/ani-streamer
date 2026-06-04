import { Route, Routes } from 'react-router-dom';
import { routes } from './routes/routes';
import { Navbar } from './components/organisms';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map((item, i) =>
          <Route key={i} path={item.path} element={item.component} />
        )}
      </Routes>
    </>
  );
}

export default App;
