import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/index';

const AuthButton = () => {
  const { loggedIn, signOut } = useAuth();

  return (
    loggedIn ? <Button onClick={signOut}>Выйти</Button> : null
  );
};

const Panel = () => (
  <div className="d-flex flex-column h-100">
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
    <Outlet />
  </div>
);

export default Panel;
