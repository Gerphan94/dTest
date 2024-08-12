import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
import Navbar from './Component/navBar';

import Login from './Component/Login/Login';
import NotFound from './Page/404';
import CasePage from './Component/Case/CasePage';
import WorkLog from './Component/WorkLog/WorkLog';

import CaseForm from './Component/Case/CaseForm';
import CaseDetail from './Component/Case/CaseDetail';
import Dashboard from './Component/Dashboard/Dashboard';
import { useState } from 'react';

function App() {

  const urlAPI = process.env.REACT_APP_API_URL;

  const [token, setToken] = useState('');

  return (
    <div className="App">
      <Router>
        <HelmetProvider>
          <Navbar />
          <div className='PageBody'>
          <Routes >
            {/* LOGGIN */}
            <Route path="/Login"
              element={
                <>
                  <Helmet>
                    <title>Login</title>
                  </Helmet>
                  <Login/>
                </>
              }
            />


          <Route path="/"
              element={
                <>
                  <Helmet>
                    <title>Dashboard</title>
                  </Helmet>
                  <Dashboard/>
                </>
              }
            />
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
            <Route path="/work-log/:month?"
              element={
                <>
                  <Helmet>
                    <title>Work Log</title>
                  </Helmet>
                  <WorkLog/>
                </>
              }
            />
            <Route path="/case/view/:case_id"
              element={
                <>
                  <Helmet>  
                  </Helmet>
                  <CaseDetail/>
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
