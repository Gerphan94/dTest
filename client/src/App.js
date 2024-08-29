import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
import Navbar from './Component/navBar';

import Login from './Component/Login/Login';
import NotFound from './Page/404';
import Overview from './Component/Overview/Overview';
import CasePage from './Component/Case/CasePage';
import CaseAdd from './Component/Case/CaseAdd';
import CaseEdit from './Component/Case/CaseForm/CaseEdit';
import WorkLog from './Component/WorkLog/WorkLog';

import CaseDetail from './Component/Case/CaseDetail/CaseDetail';
import Dashboard from './Component/Dashboard/Dashboard';
import RunOverview from './Component/Run/RunOverview';


import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useGlobalVariables } from './Store/AppContext';

function App() {

  const urlAPI = process.env.REACT_APP_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  // console.log('cookies == ', cookies)
  const [loggedIn, setLoggedIn] = useState(true);

  const { setLogginUser } = useGlobalVariables();

  useEffect(() => {
    const checkToken = async () => {
      const fetchUrl = urlAPI + 'auth/check-token/' + cookies.token;
      const response = await fetch(fetchUrl);
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setLoggedIn(true);
        setLogginUser({id: data.id, username:data.username});
      } else {
        setLoggedIn(false);
      }
    }
    checkToken();
  }, [cookies.token, urlAPI]);

  return (
    <div className="App">
      {!loggedIn ? <Login setCookie={setCookie} setLoggedIn={setLoggedIn} />
        :
        <Router>
          <Navbar setLoggedIn={setLoggedIn}  removeCookie={removeCookie} />
          <HelmetProvider>
            <div className=''>
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
                      <Dashboard  />
                    </>
                  }
                />
                <Route path="/project/overview/:projectId"
                  element={
                    <>
                      <Helmet>
                        <title>Overview</title>
                      </Helmet>
                      <Overview />
                    </>
                  }
                />
                <Route path="/runs/overview/:projectId"
                  element={
                    <>
                      <Helmet>
                        <title>Test Runs & Results</title>
                      </Helmet>
                      <RunOverview />
                    </>
                  }
                />


                <Route path="/cases/view/:projectId"
                  element={
                    <>
                      <Helmet>
                        <title>Test Cases - dTest</title>
                      </Helmet>
                      <CasePage  />
                    </>
                  }
                />

                <Route path="/case/view/:projectId/:caseId"
                  element={
                    <>
                      <Helmet>
                        <title>Case Page</title>
                      </Helmet>
                      <CaseDetail  />
                    </>
                  }
                />
                <Route path="/cases/add/:projectId"
                  element={
                    <>
                      <Helmet>
                        <title>Add Test Case</title>
                      </Helmet>
                      <CaseAdd  />
                    </>
                  }
                />
                <Route path="/case/edit/:projectId/:caseId"
                  element={
                    <>
                      <Helmet>
                        <title>Edit Test Case - dTest</title>
                      </Helmet>
                      <CaseEdit  />
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
