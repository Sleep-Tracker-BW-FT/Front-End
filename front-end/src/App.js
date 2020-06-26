import React from 'react';
import './App.css';
import UserPage from './Components/userPage'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Switch, Link, Route, useHistory} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import FormRegister from './Components/SignUp';
import Login from './Components/Login'
import LandingPage from './Components/landingPage'



function App(props) {
  const logOut = (e)=>{
    localStorage.removeItem('token')
  }
  return (
    <div className="App">
      {/* <UserPage /> */}
      <button onClick={logOut}>Log Out</button>
      <Router>
      <header>
            <div className = "top">
                <Link to ='/'><h1>Sleep Tracker</h1></Link>
                <Link to="/login">Log In</Link>
                <Link to='/register'>Sign Up!</Link>
                <Link to='/userpage'>User Page</Link>
            </div>
        </header>
      
      <Switch>
        <Route path='/register'>
          <FormRegister />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute path='/userpage' component={UserPage} />
        <Route exact path='/'>
            <LandingPage />
        </Route>
      </Switch></Router>
    </div>
  );
}

const mapStateToProps = state=>{
  return{
    isFetching : state.isFetching
  }
}

export default connect(mapStateToProps, {})(App);
