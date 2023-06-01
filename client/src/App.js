import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/landingPage';
import Home from './components/Home/home';
import Detail from './components/Detail/detail';
import CreateRecipe from './components/Create/createRecipe';
import { Redirect } from "react-router-dom";





function App() {
  return (

    <BrowserRouter>
      <div className='App'>
        <Route
          render={({ location }) => (
                <div className="inner">
                  <Switch key={location.key} location={location}>
                    <Route exact path={'/'} component={LandingPage}></Route>
                    <Route path={'/home'} exact component={Home}></Route>
                    <Route path={"/home/:id"} component={Detail}></Route>
                    <Route path={"/recipe"} component={CreateRecipe}></Route>
                    <Redirect to="/"></Redirect>
                  </Switch>
                </div>
        
          )}
        />
      </div>
    </BrowserRouter>
  
  );
}

export default App;
