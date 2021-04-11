import React from "react";
import Footer from './footer';
import PetSearch from './search';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import PetState from '../Context/petState';

function RootRouter() {


  return (
    <Router>
      <div id="page-container">
      
        <div className="App">
          <PetState>
          <Switch>
            <Route exact path="/" component={PetSearch} />
            
          </Switch>
          </PetState>
        </div>
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </Router>
  );
}

export default RootRouter;