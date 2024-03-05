import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
import Navbar from './Component/navBar';

import NotFound from './Page/404';
import CasePage from './Component/Case/CasePage';
import CaseForm from './Component/Case/CaseForm';


function App() {

  return (
    <div className="App">
      <Router>
        <HelmetProvider>
          <Navbar />
          <div className='PageBody'>
          <Routes >
            <Route path="/cases/:projectId"
              element={
                <>
                  <Helmet>
                    <title>Case Page</title>
                  </Helmet>
                  <CasePage/>
                </>
              }
            />
            <Route path="/cases/add/:projectId"
              element={
                <>
                  <Helmet>
                    <title>Case Add</title>
                  </Helmet>
                  <CaseForm/>
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
