import React from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import { loginUser as login } from "../Utils/Api";
import "../styles/login.css";

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

  loginUser = async () => {
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
          <h3>Sistema De Monitoreo Para Invernaderos - SIMIN</h3>
        </div>

        <Container className="layout">
          <Row className="d-flex justify-content-center">
            <Col className="col-sm-4">
              <div className="d-flex justify-content-center icon">
                <FontAwesomeIcon icon={faUser} classame="usr" color="#4D4D4D" />
              </div>

              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Correo Electrónico:</Form.Label>
                  <Form.Control
                    onChange={this.onChangeEmail}
                    value={this.state.email}
                    type="email"
                    placeholder="Ingrese su e-mail aquí"
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

                <Button
                  variant="primary"
                  onClick={this.loginUser}
                  className="btn-block"
                >
                  Entrar
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
