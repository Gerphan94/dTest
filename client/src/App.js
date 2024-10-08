import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CaseProvider } from './Store/CaseContext';


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
import RunView from './Component/Run/RunView';
import RunAdd from './Component/Run/RunAdd';
import RunEdit from './Component/Run/RunEdit';

import MileStone from './Component/Milestone/MileStone';


import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useGlobalVariables } from './Store/AppContext';

import { useAuth } from './Component/Login/UseAuth';

function App() {

  const urlAPI = process.env.REACT_APP_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  // console.log('cookies == ', cookies)
  const [loggedIn, setLoggedIn] = useState(true);

  const { setLogginUser } = useGlobalVariables();

  const PageList = [
    { name: "Login", path: "/Login", title: 'Login', component: <Login /> },
    { name: "Dashboard", path: "/dashboard", title: 'Dashboard', component: <Dashboard /> },
    { name: "Dashboard", path: "/", title: 'Dashboard', component: <Dashboard /> },
    { name: "Overview", path: "/project/overview/:projectId", title: 'Overview', component: <Overview />},
    { name: "MileStone", path: "/milestones/overview/:projectId", title: 'MileStone', component: <MileStone /> },
    // TESTCASE
    // { name: "Testcases", path: "/cases/view/:projectId", title: 'Case', component: <CasePage /> },
    { name: "CaseAdd", path: "/cases/add/:projectId", title: 'CaseAdd', component: <CaseAdd /> },
    { name: "CaseEdit", path: "/cases/edit/:caseId", title: 'CaseEdit', component: <CaseEdit /> },
    // { name: "WorkLog", path: "/worklog/:projectId", title: 'WorkLog', component: <WorkLog /> },
    { name: "CaseDetail", path: "/cases/view/:caseId", title: 'CaseDetail', component: <CaseDetail /> },
    
    { name: "RunOverview", path: "/runs/overview/:projectId", title: 'RunOverview', component: <RunOverview /> },
    { name: "RunView", path: "/runs/view/:runId", title: 'RunView', component: <RunView /> },
    { name: "RunAdd", path: "/runs/add/:projectId", title: 'RunAdd', component: <RunAdd /> },
    { name: "RunEdit", path: "/runs/edit/:runId", title: 'Edit Test Run - dTest', component: <RunEdit /> },

    { name: "NotFound", path: "*", title: 'NotFound', component: <NotFound /> },
  ]

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(urlAPI + '/auth/check-token/' + cookies.token);
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setLoggedIn(true);
          setLogginUser({ id: data.id, username: data.username });
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setLoggedIn(false);
      }
    };
    checkToken();
  }, [cookies.token]);
  
  return (
    <div className="App">
      {!loggedIn ? <Login setCookie={setCookie} setLoggedIn={setLoggedIn} />
        :
        <>
          <HelmetProvider>
          {/* <Navbar setLoggedIn={setLoggedIn} removeCookie={removeCookie} /> */}
            <div className=''>
              <Routes >
                <Route key="Testcase" path="/suites/view/:projectId"
                  element={
                    <>
                      <Helmet>
                        <title>Testcases - dTest</title>
                      </Helmet>
                      <CaseProvider>
                        <CasePage />
                      </CaseProvider>

                    </>
                  } />

                {PageList.map((item, index) => {
                  return (

                    <Route key={item.name} path={item.path}
                      element={
                        <>
                          <Helmet>
                            <title>{item.title}</title>
                          </Helmet>
                          {item.component}
                        </>
                      } />

                  )
                })}
              </Routes>
            </div>
          </HelmetProvider>

        </>
      }
    </div>
  );
}

export default App;
