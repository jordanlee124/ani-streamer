import { Route, Routes } from 'react-router-dom';
import { routes } from './routes/routes';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          {routes.map((item, i) => 
            <Route key={i} path={item.path} element={item.component}/>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
