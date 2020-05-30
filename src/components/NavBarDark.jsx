import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/navBar.css';

export default class NavBarDark extends Component {
  logout = () => {
    localStorage.clear();
  };

  isAdmin = () => {
    let role = localStorage.getItem('role');
    return role == 'admin' ? true : false;
  };

  isViewer = () => {
    let role = localStorage.getItem('role');
    return role == 'viewer' ? true : false;
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <FontAwesomeIcon className="seedling" icon={faSeedling} />
          MSG
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">
            Inicio
          </Nav.Link>
          {this.isAdmin() && (
            <Nav.Link as={Link} to="/users">
              Admin Usuarios
            </Nav.Link>
          )}
          {this.isViewer() && (
            <Nav.Link as={Link} to="/diseases">
              Estado Cama
            </Nav.Link>
          )}
          {this.isViewer() && (
            <Nav.Link as={Link} to="/configactions">
              Acciones
            </Nav.Link>
          )}

          <Nav.Link as={Link} to="/">
            <span onClick={this.logout}> Cerrar Sesión </span>
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
