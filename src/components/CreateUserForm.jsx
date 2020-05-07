import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { createUser } from '../Utils/Api';

export default class CreateUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { role: 'admin' },
    };
  }

  createUser = async (event) => {
    event.preventDefault();

    if (this.state.user.password !== this.state.user.password_v) {
      this.props.showNotification(
        'error',
        'Error',
        'Las contraseñas no coinciden'
      );
      return;
    }

    let user = this.state.user;

    this.props.setLoading(true);

    try {
      await createUser(user);
      this.props.refreshUsers();

      this.props.showNotification(
        'success',
        'Ok',
        'El usuario se creo en el sistema'
      );
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        'Algo salió mal al crear el usuario'
      );
    }

    this.props.setLoading(false);
  };

  render() {
    return (
      <React.Fragment>
        <h3>Crear un usuario</h3>
        <Form onSubmit={this.createUser}>
          <Row>
            <Col className="col-sm-4">
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({
                      user: { ...this.state.user, name: e.target.value },
                    })
                  }
                  value={this.state.user.name}
                  type="text"
                  placeholder="Nombre"
                  required={true}
                />
              </Form.Group>
            </Col>

            <Col className="col-sm-4">
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({
                      user: { ...this.state.user, last_name: e.target.value },
                    })
                  }
                  value={this.state.user.last_name}
                  type="text"
                  placeholder="Apellido"
                />
              </Form.Group>
            </Col>

            <Col className="col-sm-4">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({
                      user: { ...this.state.user, email: e.target.value },
                    })
                  }
                  value={this.state.user.email}
                  type="email"
                  placeholder="Email"
                  required={true}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="col-sm-4">
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({
                      user: { ...this.state.user, password: e.target.value },
                    })
                  }
                  value={this.state.user.password}
                  type="password"
                  placeholder="Contraseña"
                  required={true}
                />
              </Form.Group>
            </Col>

            <Col className="col-sm-4">
              <Form.Group>
                <Form.Label>Repita la contraseña</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({
                      user: { ...this.state.user, password_v: e.target.value },
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
                <Form.Label>Seleccione un rol</Form.Label>
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
            <Col className="col-sm-4">
              <Button
                type="submit"
                value="Submit"
                variant="primary"
                className="btn-block"
              >
                Crear
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
