import React, { useEffect } from 'react'
import {auth, signInWithGooglePopup, creatUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
// import {getRedirectResult} from 'firebase/auth'

const SignIn = () => {
    
    // useEffect( () => {
    //     const redirectResult = async() => {
    //     const response = await getRedirectResult(auth)
    //     await console.log(response);
        
    //     // if(response){
    //     //     const userDocRef = await creatUserDocumentFromAuth(response.user) 
    //     //     console.log(userDocRef);             
    //     // }        
    // }
    //     redirectResult()
    // }, [])

    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup()
        const userDocRef = await creatUserDocumentFromAuth(user)         
    }


  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignUpForm/>
    </div>
  )
}

export default SignIn
