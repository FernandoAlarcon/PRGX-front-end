import './App.css';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home';
import Footer from './components/Footer.jsx';
import InfoPoost from './components/InfoPost'; 
 


import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="">
          <NavBar/>
          <div className="container " > 
            <div className="row ">
              <div className="col-lg-12 ">
                <div className=" styles-routes   page-content container-fluid ">
                      <Routes  >
                          <Route exact path='/' element={< Home />}></Route>
                          <Route exact path='/newPosts' element={< InfoPoost />}></Route> 
                      </Routes>
                </div>
              </div>
            </div>
            {/* < Home /> */}
          </div>
          <Footer/>    
        </div>
    </Router>
  );
}

export default App;
