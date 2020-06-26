import RegisterSchema from './RegisterSchema';
import * as yup from 'yup'
import React,{useState, useEffect} from 'react';
import {Form, Row, FormGroup, FormFeedback, Label, Input} from 'reactstrap'
import {useHistory} from 'react-router-dom'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {connect} from 'react-redux'
import {createUser} from '../actions/userActions'


const styling = {
    width:'400px',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'right',
    paddingRight: '35px',
    paddingLeft: 'auto',
}

const originalRegisterValues = {
    firstName:'',
    lastName:'',
    email:'',
    password:''
}

const originalRegisterErrors ={
    firstName:'',
    lastName:'',
    email:'',
    password:''
}

const FormRegister = props =>{
    const [registerValues, setRegisterValues] = useState(originalRegisterValues)
    const [registerErrors, setRegisterErrors] = useState(originalRegisterErrors)
    const [registerDisabled, setRegisterDisabled] = useState(false);
    const [terms, termsRead] = useState(false);
    let history = useHistory();
      

      const registerSubmit = evt =>{
        evt.preventDefault();
        //checks for terms and conditions box, if not checked nothing will happen
        if(terms){
          // console.log('submit button will work')
          setRegisterErrors({...registerErrors, termsOfService:''})
        }else{
          // console.log('submit button will not work')
          setRegisterErrors({...registerErrors, termsOfService: 'Terms and Conditions must be checked read'})
          return ''
        }
    //since terms is checked will attempt to register user with api
    const newUser={
      first_name:registerValues.firstName,
      last_name: registerValues.lastName,
      email: registerValues.email,
      password: registerValues.password
    }
    
    console.log(newUser)
    props.createUser(newUser)
    history.push('/login')
      }

      const registerCheckbox =evt=>{
        const {name} = evt.target;
        const {checked}= evt.target;
  
        // console.log(name, checked)
      termsRead(checked)
      setRegisterErrors({...registerErrors, termsOfService:''})
    }

    const onInputChange = (evt) =>{
        const name= evt.currentTarget.name
        const value = evt.currentTarget.value
        // console.log(name, evt.currentTarget.value)
        yup
          .reach(RegisterSchema, name)
          .validate(value)
          .then(valid=>{
            setRegisterErrors({...registerErrors,
              [name]:''
            })
          })
          .catch(err=>{
            setRegisterErrors({...registerErrors,
              [name]:err.errors[0]
            })
          })

          setRegisterValues({...registerValues, [name]: value})

        }

    return(
        <Form style={styling}>
        <h2>Register a new Account</h2>
        <FormGroup>
            <Row>
            <Label>First Name</Label>
            <Input name='firstName' placeholder='Enter First Name' type='text' value={registerValues.firstName} onChange={onInputChange} />
<FormFeedback name='firstNameErrors'>{registerErrors.firstName}</FormFeedback>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <Label>Last Name</Label>
            <Input name='lastName' placeholder='Enter Last Name' type='text' value={registerValues.lastName} onChange={onInputChange} />
<FormFeedback name='lastNameErrors'>{registerErrors.lastName}</FormFeedback>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <Label>Email</Label>
            <Input name='email' placeholder='Enter email' type='text' value={registerValues.email} onChange={onInputChange} />
<FormFeedback name='emailErrors'>{registerErrors.email}</FormFeedback>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <Label>Password</Label>
            <Input name='password' placeholder='password' type='password' value={registerValues.password} onChange={onInputChange} />
            <FormFeedback name='passwordErrors'>{registerErrors.password}</FormFeedback>
            </Row>
        </FormGroup>

        <FormGroup>
            <Label>Have you read the Terms and Conditions</Label>
            <Input name='termsOfService' type='checkbox' onClick={registerCheckbox}/>
            <FormFeedback name='termsOfServiceErrors'>{registerErrors.termsOfService}</FormFeedback>
        </FormGroup>
        <button disabled={registerDisabled} onClick={registerSubmit} name='registerSubmit'>Submit</button>
    </Form>
    )
}

const mapStateToProps = state=>{
  return state
}

export default connect(mapStateToProps, {createUser})(FormRegister)