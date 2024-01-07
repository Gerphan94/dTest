import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
import Navbar from './Component/navBar';

import NotFound from './Page/404';
import CasePage from './Component/Case/CasePage';

function App() {

  return (
    <div className="App">
      <Router>
        <HelmetProvider>
          <Navbar />
          <div className='mt-16'>
          <Routes >
            <Route path="/cases"
              element={
                <>
                  <Helmet>
                    <title>Case Page</title>
                  </Helmet>
                  <CasePage/>
                </>
              }
            />
           
          <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
          
        </HelmetProvider>

      </Router>
    </div>
  );
}

export default App;
