import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { createUser } from "../Utils/Api";

export default class CreateUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { role: "admin" },
    };
  }

  createUser = async (event) => {
    event.preventDefault();

    if (this.state.user.password !== this.state.user.password_v) {
      this.props.showNotification(
        "error",
        "Error",
        "Las contraseñas no coinciden"
      );
      return;
    }

    let user = this.state.user;

    this.props.setLoading(true);

    try {
      await createUser(user);
      this.props.refreshUsers();

      this.props.showNotification(
        "success",
        "Ok",
        "El usuario se ha creado satisfactoriamente"
      );
    } catch (error) {
      this.props.showNotification(
        "error",
        "Error",
        "¡Ups!, algo salió mal al crear el usuario"
      );
    }

    this.props.setLoading(false);
  };

  render() {
    return (
      <React.Fragment>
        <div className="pt-4 text-center">
          <h3>Agregar Usuario:</h3>
        </div>
        <div className="pt-4 text-center">
          <Form onSubmit={this.createUser}>
            <Row>
              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, name: e.target.value },
                      })
                    }
                    value={this.state.user.name}
                    type="text"
                    placeholder="Ingrese aquí nombre"
                    required={true}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, last_name: e.target.value },
                      })
                    }
                    value={this.state.user.last_name}
                    type="text"
                    placeholder="Ingrese aquí apellido"
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Correo Electrónico:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, email: e.target.value },
                      })
                    }
                    value={this.state.user.email}
                    type="email"
                    placeholder="Ingrese aquí el e-mail"
                    required={true}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, password: e.target.value },
                      })
                    }
                    value={this.state.user.password}
                    type="password"
                    placeholder="Ingrese aquí la contraseña"
                    required={true}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Confirme La Contraseña:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: {
                          ...this.state.user,
                          password_v: e.target.value,
                        },
                      })
                    }
                    value={this.state.user.password_v}
                    type="password"
                    placeholder="Contraseña"
                    required={true}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Seleccione Rol:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, role: e.target.value },
                      })
                    }
                    as="select"
                    required={true}
                  >
                    <option value="admin">Administrador</option>
                    <option value="viewer">Visor</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-15">
                <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    value="Submit"
                    variant="primary"
                    className="btn-block w-50 "
                  >
                    Agregar
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}
