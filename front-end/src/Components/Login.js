import {axiosWithAuth} from '../utils/axiosWithAuth'
import React, {useState} from 'react'
import { Label } from 'reactstrap'



const Login = () =>{
  const [values, setValues] = useState({email: '', password: ''})

  const changeHandler = e =>{
    setValues({[e.target.name]:e.target.value})
  }

  const onSubmit = e =>{
    e.preventDefault();
    axiosWithAuth()
    .post('/api/auth/login', values)
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
  }

  return(
    <form onSubmit={onSubmit}>
      <label>Email</label>
      <input type='email' value={values.email} onChange={changeHandler} />
      <label>Password</label>
      <input type='password' value={values.password} onChange={changeHandler} />
      <button name='submit'>Login</button>
    </form>
  )
}

export default Login