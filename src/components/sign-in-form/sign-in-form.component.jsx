import React, { useState } from 'react'
import {signInWithGooglePopup, creatUserDocumentFromAuth, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'

const SignInForm = () => {
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formFields

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }
    const resetFormFields = () => {
        setFormFields({
        email: '',
        password: '',
    })
    }


    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            await signInAuthUserWithEmailAndPassword(email, password)                 
            resetFormFields()     
        }   catch(err) {
            switch(err.code){
                case 'auth/wrong-password':
                    console.log('icorrect password for email');
                    break
                case 'auth/user-not-found':
                    console.log('no user associated with this email');
                    break
                default:
                    console.log(err);
                    
            }
            console.log(err);
            
        }
          
    }

    const logGoogleUser = async() => {
        
        try {
        await signInWithGooglePopup()    
        } catch(err) {
            console.log('error occured', err);
            
        }
               
    }
  return (
    <div className='sign-in-container'>
        <h2>I already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>        
        <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>     
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
        <Button buttonType='google' type='button' onClick={logGoogleUser}>GOOGLE SIGN IN</Button>  
        </div>   
        
      </form>
    </div>
  )
}

export default SignInForm
