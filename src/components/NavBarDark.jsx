import React, { Component } from 'react';
import { Navbar, Nav , NavDropdown} from 'react-bootstrap';
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
          <NavDropdown title="DashBoards" >
            <NavDropdown.Item  href ="/DB1">Historial de camas</NavDropdown.Item>
            <NavDropdown.Item href="/DB2">Gráfica de eventos</NavDropdown.Item>
            <NavDropdown.Item href="/DB3">Gráfica grados día</NavDropdown.Item>
            <NavDropdown.Item href="/DB4">Gráfica de enfermedades</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/">
            <span onClick={this.logout}> Cerrar Sesión </span>
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
