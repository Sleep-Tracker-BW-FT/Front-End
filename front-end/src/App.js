import React from 'react';
import './App.css';
import UserPage from './Components/userPage'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'


function App(props) {
  localStorage.removeItem('token')
  return (
    <div className="App">
      <Router>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Sign Up!</Link>
        <Link to='/userpage'>Your Profile</Link>
      <Switch>
        <PrivateRoute path='/userpage' component={UserPage} />
        <Route path='/'>
          {props.isFetching && (<div>Currently loading User Data</div>)}
          {!props.isFetching && (<div>Please Log in to continue!</div>)}
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
