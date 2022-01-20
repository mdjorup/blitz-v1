import React from 'react';
import '../css/Header.css';

//icons
import {SiBetfair} from 'react-icons/si'

//bootstrap components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Header() {
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/scores">Standings</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item >Another action</NavDropdown.Item>
                <NavDropdown.Item >Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* If signed in, change this */}
      <div className="header__left">
        <Button className='btn__login' variant='outline-dark' href='/login'>Login</Button>
        <Button className='btn__register' variant='dark' href='register'>Register</Button>
      </div>

    </div>
  );
}

export default Header;
