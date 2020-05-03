import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import '../styles/navBar.css';

export default class NavBarDark extends Component {
  logout = () => {
    localStorage.clear();
  };

  isAdmin = () => {
    let role = localStorage.getItem('role');
    return role == 'admin' ? true : false;
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <FontAwesomeIcon className="seedling" icon={faSeedling} />
          Sistema de monitoreo
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="/home">Inicio</Nav.Link>

          {this.isAdmin() && <Nav.Link href="/users">Usuarios</Nav.Link>}

          <Nav.Link href="#camas">Camas</Nav.Link>

          {this.isAdmin() && <Nav.Link href="#features">Acciones</Nav.Link>}

          <Nav.Link href="/">
            <span onClick={this.logout}> Salir </span>
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
