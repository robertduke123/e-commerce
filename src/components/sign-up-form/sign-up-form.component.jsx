import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, creatUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}




const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFields)
    const {displayName, email, password, confirmPassword} = formFields

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
        }

    const resetFormFields = () => {
        setFormFields(defaultFields)
    }

     const handleSubmit = async(event) => {
        event.preventDefault()
        if(password === confirmPassword) {
            try {
               const {user} = await createAuthUserWithEmailAndPassword(email, password)
               await creatUserDocumentFromAuth(user, {displayName})
            } catch(err) {
                if(err.code === 'auth/email-already-in-use'){
                    console.log('Cannot create user, email already in use');                    
                }
                console.log('user confirmation encountered an errot', err);
                
            }
           resetFormFields()
           
        }        
    }

  return (
    <div className='sign-up-container'>
        <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Display Name' required onChange={handleChange} name='displayName' value={displayName}/>
        <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>        
        <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>        
        <FormInput label='Confirm Password' type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
