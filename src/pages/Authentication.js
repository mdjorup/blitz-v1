import React, {useState} from 'react';
import '../css/Authentication.css';
import {auth, db} from '../firebase.js';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {doc, setDoc, Timestamp} from "firebase/firestore"; 

import {SiBetfair} from 'react-icons/si';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function Authentication({authType}) {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    setLoading(true);
    if (!firstName || !lastName || !email || !password){
      setErrorMessage("Please fill in all fields");
      setLoading(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        //signed in
        const name = firstName + " " + lastName;
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        await setDoc(doc(db, 'Users', userCredential.user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          lastSignIn: Timestamp.now(),
          scores: {}
        })
        setLoading(false)
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.code);
      })
  }

  const handleLogin = () => {
    setLoading(true);
    if (!email || !password){
      setErrorMessage("Please fill in all fields");
      setLoading(false);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const docRef = doc(db, 'Users', userCredential.user.uid);
        await setDoc(docRef, {lastSignIn: Timestamp.now()}, {merge: true});
        setLoading(false)
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.code);
      })
  }

  const handleSubmit = () => {
    authType === 'register' ? handleRegister() : handleLogin();
  }

  const displayErrorMessage = (message) => {
    if(message === "auth/invalid-email"){
      return "Invalid email";
    } else if (message === 'auth/user-not-found'){
      return "User not found";
    } else if (message === 'auth/wrong-password'){
      return "Incorrect password";
    } else if(message === 'auth/email-already-in-use'){
      return "Email already exists";
    } else {
      return message;
    }
  }

  return (
    <div className="authentication">
      <div className="auth__header">
        <div className="auth__header__left" onClick={()=>navigate('/')}>
          <SiBetfair color='black' size={45}/>
          <h2>Blitz</h2>
        </div>
        <div className='btn__container'>
          {authType === 'register' &&
            <Button href='/login' variant='outline-dark'>Log In</Button>
          }
          {authType === 'login' &&
            <Button href='/register' variant='outline-dark'>Register</Button>
          }
        </div>
      </div>
      <div className="auth__body">
        <Form>
          {authType === 'register' && <Form.Group className='form__group'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' onChange={event => setFirstName(event.target.value)}/>
          </Form.Group>}
          {authType === 'register' && <Form.Group className='form__group'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' onChange={event => setLastName(event.target.value)}/>
          </Form.Group>}
          <Form.Group className='form__group'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' onChange={event => setEmail(event.target.value)}/>
          </Form.Group>
          <Form.Group className='form__group'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' onChange={event => setPassword(event.target.value)}/>
          </Form.Group>
        </Form>
        {errorMessage && <h6 style={{textAlign: 'center'}}>{displayErrorMessage(errorMessage)}</h6>}
        <div className="btn__container">
          {!loading && <Button variant='dark' onClick={handleSubmit}>Submit</Button>}
          {loading && <Spinner animation='border'/>}
        </div>

      </div>
    </div>
  );
}

export default Authentication;
