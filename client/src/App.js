import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
import Navbar from './Component/navBar';

function App() {

  return (
    <div className="App">
      <Router>
        <HelmetProvider>
          <Navbar />
          <Routes>
            {/* <Route path="/"
              element={
                <>
                  <Helmet>
                    <title>Home Page</title>
                  </Helmet>
                  <HomePage />
                </>
              }
            /> */}
           
          
          </Routes>
        </HelmetProvider>

      </Router>
    </div>
  );
}

export default App;
