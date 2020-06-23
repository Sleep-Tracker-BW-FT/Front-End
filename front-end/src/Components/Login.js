import RegisterSchema from './RegisterSchema';
import * as yup from 'yup'
import React from 'react';

const styling = {
    width:'400px',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'right',
    paddingRight: '35px',
    paddingLeft: 'auto',
    color: '#4c7031'
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
      firstName:registerValues.firstName,
      lastName: registerValues.lastName,
      email: registerValues.email,
      password: registerValues.password
    }
    
    console.log(newUser)
    const url ='https://potluck-be.herokuapp.com/api/auth/register'
    
        axios
        .post(url, newUser)
        .then(response=>{
          console.log('response',response.data)
          history.push('/login')
        })
        .catch(err=>{console.log('err', err)})
      }

      const registerCheckbox =evt=>{
        const {name} = evt.target;
        const {checked}= evt.target;
  
        // console.log(name, checked)
      termsRead(checked)
      setRegisterErrors({...registerErrors, termsOfService:''})
    }

    const registerChange = (evt) =>{
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
            <Label>Username</Label>
            <Input name='firstName' placeholder='Enter First Name' type='text' value={values.firstName} onChange={onInputChange} />
<FormFeedback name='firstNameErrors'>{errors.firstName}</FormFeedback>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <Label>Username</Label>
            <Input name='lastName' placeholder='Enter Last Name' type='text' value={values.lastName} onChange={onInputChange} />
<FormFeedback name='lastNameErrors'>{errors.lastName}</FormFeedback>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <Label>Email</Label>
            <Input name='email' placeholder='Enter email' type='text' value={values.email} onChange={onInputChange} />
<FormFeedback name='emailErrors'>{errors.email}</FormFeedback>
            </Row>
        </FormGroup>

        <FormGroup>
            <Row>
            <Label>Password</Label>
            <Input name='password' placeholder='password' type='password' value={values.password} onChange={onInputChange} />
            <FormFeedback name='passwordErrors'>{errors.password}</FormFeedback>
            </Row>
        </FormGroup>

        <FormGroup>
            <Label>Have you read the Terms and Conditions</Label>
            <Input name='termsOfService' type='checkbox' onClick={termsOfService}/>
            <FormFeedback name='termsOfServiceErrors'>{errors.termsOfService}</FormFeedback>
        </FormGroup>
        <button disabled={registerDisabled} onClick={registerSubmit} name='registerSubmit'>Submit</button>
    </Form>
    )
}

export default FormRegister