import React from 'react';
import '../css/Header.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

//icons
import {SiBetfair} from 'react-icons/si'

//bootstrap components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function Header({user}) {

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      //Sign out successful
    }).catch((error) => {
      //error signing out
    })
    navigate('/');
  }

  return (
    
    <div className="header">
      <Navbar bg="white" expand="lg">
        <Container>
          <Navbar.Brand className='header__left' href="/">
            <SiBetfair color='black' size={45}/>
            <h2>Blitz</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={()=> navigate('/standings')}>Standings</Nav.Link>
              {user && <Nav.Link onClick={() => navigate('/picks')}>Make Picks</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* If signed in, change this */}
      {user && <div className="header__right user">
        Welcome, {user.displayName}
        <Button style={{'margin-left': '30px'}} variant='outline-dark' onClick={handleSignOut} href='/'>Sign out</Button>
      </div>}
      {!user && <div className="header__right nulluser">
        <Button className='btn__login' variant='outline-dark' onClick={()=>navigate('/login')}>Log In</Button>
        <Button className='btn__register' variant='dark' onClick={()=>navigate('/register')}>Register</Button>
      </div>}

    </div>
  );
}

export default Header;
