import {axiosWithAuth} from '../utils/axiosWithAuth'
import React, {useState} from 'react'
import { Label } from 'reactstrap'
import {connect} from 'react-redux'
import {fetchUser} from '../actions/userActions'
import {useHistory} from 'react-router-dom'


const Login = (props) =>{
  const [values, setValues] = useState({email: '', password: ''})

  const changeHandler = e =>{
    setValues({[e.target.name]:e.target.value})
  }
  const history=useHistory();
  const onSubmit = e =>{
    e.preventDefault();
    
    props.fetchUser(values)
    history.push('/')
  }

  return(
    <form onSubmit={onSubmit}>
      <label>Email</label>
      <input type='email' value={values.email} onChange={e=>{setValues({...values, email: e.target.value})}} />
      <label>Password</label>
      <input type='password' value={values.password} onChange={e=>{setValues({...values, password: e.target.value})}} />
      <button name='submit'>Login</button>
    </form>
  )
}

const mapStateToProps = state=>{
  return state
}

export default connect(mapStateToProps, {fetchUser})(Login)