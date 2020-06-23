import * as yup from 'yup';



const RegisterSchema = yup.object().shape({
    firstName: yup.string().trim().min(3,'The username must be at least 3 characters long').required('First name is a required field'),
    lastName: yup.string().trim().required('A last name is required'),
    email: yup.string().trim().required('An email address is required').email('The email must be a valid email address'),
    password: yup.string().required('You must type in a password').min(6,'Your password must be at least 6 characters long')
})

export default RegisterSchema