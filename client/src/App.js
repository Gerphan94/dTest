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
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function App() {

  const urlAPI = process.env.REACT_APP_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  console.log('cookies == ',cookies)
  const [loggedIn, setLoggedIn] = useState(true);
  const [usernameLogin, setUsernameLogin] = useState('');
  const [projectId, setProjectId] = useState(0);


  useEffect(() => {
    const checkToken = async () => {
      const fetchUrl = urlAPI + 'auth/check_token/' + cookies.token;
      const response = await fetch(fetchUrl);
      const data = await response.json();
      if (data.success) {
        setLoggedIn(true);
        setUsernameLogin(data.username);
      } else {
        setLoggedIn(false);
      }

    }

    checkToken();


  }, []);

  return (
    <div className="App">
      {!loggedIn ? <Login setCookie={setCookie} setLoggedIn={setLoggedIn} />
        :
        <Router>
          <HelmetProvider>
            {/* <Navbar projectId={projectId}  usernameLogin={usernameLogin} removeCookie={removeCookie} setLoggedIn={setLoggedIn} /> */}
            <div className='h-screen'>
              <Routes >
                {/* LOGGIN */}
                <Route path="/Login"
                  element={
                    <>
                      <Helmet>
                        <title>Login</title>
                      </Helmet>
                      <Login setCookie={setCookie} />
                    </>
                  }
                />
                <Route path="/"
                  element={
                    <>
                      <Helmet>
                        <title>Dashboard</title>
                      </Helmet>
                      <Dashboard setProjectId={setProjectId} />
                    </>
                  }
                />
                <Route path="/project/overview/:projectId"
                  element={
                    <>
                      <Helmet>
                        <title>Case Page</title>
                      </Helmet>
                      <CasePage />
                    </>
                  }
                />
                <Route path="/work-log/:month?"
                  element={
                    <>
                      <Helmet>
                        <title>Work Log</title>
                      </Helmet>
                      <WorkLog />
                    </>
                  }
                />
                <Route path="/case/view/:case_id"
                  element={
                    <>
                      <Helmet>
                      </Helmet>
                      <CaseDetail />
                    </>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

          </HelmetProvider>

        </Router>
      }
    </div>
  );
}

export default App;
