import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AppProvider } from './Store/AppContext';

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
import RunView from './Component/Run/RunView';
import RunAdd from './Component/Run/RunAdd';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useGlobalVariables } from './Store/AppContext';

function App() {

  const urlAPI = process.env.REACT_APP_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  // console.log('cookies == ', cookies)
  const [loggedIn, setLoggedIn] = useState(true);

  const { setLogginUser } = useGlobalVariables();

  const PageList = [
    { name: "Login", path: "/Login", title: 'Login', component: Login },
    { name: "Dashboard", path: "/dashboard/:projectId", title: 'Dashboard', component:  <Dashboard />},
    { name: "Dashboard", path: "/", title: 'Dashboard', component: <Dashboard /> },
    { name: "Overview", path: "/project/overview/:projectId", title: 'Overview', component: Overview },
    { name: "Testcases", path: "/cases/view/:projectId", title: 'Case', component: <CasePage /> },
    { name: "CaseAdd", path: "/cases/add/:projectId", title: 'CaseAdd', component: <CaseAdd /> },
    { name: "CaseEdit", path: "/cases/edit/:projectId", title: 'CaseEdit', component: <CaseEdit /> },
    { name: "WorkLog", path: "/worklog/:projectId", title: 'WorkLog', component: <WorkLog /> },
    { name: "CaseDetail", path: "/cases/view/:projectId/:caseId", title: 'CaseDetail', component: <CaseDetail /> },
    { name: "RunOverview", path: "/runs/overview/:projectId", title: 'RunOverview', component: <RunOverview /> },
    { name: "RunView", path: "/runs/view/:runId", title: 'RunView', component: <RunView /> },

    { name: "RunAdd", path: "/runs/add/:projectId", title: 'RunAdd', component: <RunAdd /> },
    { name: "NotFound", path: "*", title: 'NotFound', component: <NotFound /> },
  ]

  useEffect(() => {
    const checkToken = async () => {
      const fetchUrl = urlAPI + 'auth/check-token/' + cookies.token;
      const response = await fetch(fetchUrl);
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setLoggedIn(true);
        setLogginUser({ id: data.id, username: data.username });
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
        <>
          <Navbar setLoggedIn={setLoggedIn} removeCookie={removeCookie} />
          <HelmetProvider>
            <div className=''>
              <Routes >
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
