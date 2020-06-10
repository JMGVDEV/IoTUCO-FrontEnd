import React from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import { loginUser as login } from "../Utils/Api";
import "../styles/login.css";
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { GiFarmer } from "react-icons/gi";

//AiOutlineFundView 
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      login: false,
    };
  }

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  loginUser = async (e) => {
    e.preventDefault();

    try {
      await login(this.state.email, this.state.password);
      this.setState({ error: false, login: true });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    const errorMessage = (
      <Alert className="alert" variant="danger">
        Usuario o contraseña inválidos
      </Alert>
    );

    const redirect = (
      <Redirect
        to={{
          pathname: "/home",
          state: { name: this.state.name },
        }}
      />
    );

    if (this.state.login) {
      return redirect;
    }

    return (
      <div className="layout">
        <div className="navBar">
        <FontAwesomeIcon className="seedling" icon={faLeaf} />
          <h3> Sistema de Monitoreo para Invernaderos - MSG</h3>
        </div>

        <Container className="layout">
          <Row className="d-flex justify-content-center">
            <Col className="col-sm-4">
              <div className="d-flex justify-content-center icon">
                <GiFarmer classame="usr" color="2AC218" />
              </div>

              <Form onSubmit={this.loginUser}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Correo Electrónico:</Form.Label>
                  <Form.Control
                    onChange={this.onChangeEmail}
                    value={this.state.email}
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    onChange={this.onChangePassword}
                    value={this.state.password}
                    type="password"
                    placeholder="**********"
                  />
                </Form.Group>

                <Button type="submit" variant="btn btn-outline-primary"  className="btn-block">
                  Iniciar Sesión
                </Button>
              </Form>
              {this.state.error ? errorMessage : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginPage;
