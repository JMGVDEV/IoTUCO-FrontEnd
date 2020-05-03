import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { updateUser, deleteUser } from '../Utils/Api';

export default class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      editing: false,
      user_selected: false,
    };
  }

  updateUser = async () => {
    let user = this.state.user;

    try {
      this.props.setLoading(true);
      await updateUser(user);
      await this.props.refreshUsers();

      this.props.showNotification('success', 'Ok', 'Usuario actualizado');
      this.props.setLoading(false);
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        'Algo salió mal al actualizar el usuario'
      );
    }
    this.setState({ editing: false });
  };

  deleteUser = async () => {
    let user = this.state.user;

    try {
      this.props.setLoading(true);
      await deleteUser(user);
      await this.props.refreshUsers();
      this.setState({ user: this.props.users[0] });

      this.props.showNotification('success', 'Ok', 'Usuario eliminado');
      this.props.setLoading(false);
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        'Algo salió mal al eliminar el usuario'
      );
      this.props.setLoading(false);
    }
    this.setState({ editing: false });
  };

  setUser = (event) => {
    if (!event.target.value) {
      this.setState({ user: { name: '', last_name: '', email: '' } });
      return;
    }

    let user = this.props.users.find((user) => user.name == event.target.value);
    this.setState({ user, user_selected: true });
  };

  render() {
    return (
      <React.Fragment>
        <h3>Seleccione un usuario</h3>

        <Form>
          <Form.Group placeholder="Seleccione">
            <Form.Control onChange={this.setUser} as="select">
              <option value="" defaultValue selected disabled>
                Seleccione
              </option>
              {this.props.users.map((user) => {
                return (
                  <option value={user.name} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form>

        <div className="text-center pb-3 shadow-lg">
          <Row className="d-flex flex-column align-items-center">
            <div className="icon p-0 m-0">
              <FontAwesomeIcon icon={faUser} color="#4D4D4D" />
            </div>

            <Form className="w-75">
              <Form.Group>
                <Form.Control
                  disabled={!this.state.editing}
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

              <Form.Group>
                <Form.Control
                  disabled={!this.state.editing}
                  onChange={(e) =>
                    this.setState({
                      user: { ...this.state.user, last_name: e.target.value },
                    })
                  }
                  value={this.state.user.last_name}
                  type="text"
                  placeholder="Apellido"
                  required={true}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  disabled={!this.state.editing}
                  onChange={(e) =>
                    this.setState({
                      user: { ...this.state.user, email: e.target.value },
                    })
                  }
                  value={this.state.user.email}
                  type="text"
                  placeholder="Email"
                  required={true}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  disabled={!this.state.editing}
                  onChange={(e) =>
                    this.setState({
                      user: { ...this.state.user, role: e.target.value },
                    })
                  }
                  as="select"
                  required={true}
                  value={this.state.user.role}
                >
                  <option value="admin">Administrador</option>
                  <option value="viewer">Visor</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Row>

          <Row className="justify-content-around w-100 m-0 px-3">
            <Col className="col-md-5">
              {!this.state.editing ? (
                <Button
                  variant="primary"
                  onClick={() => this.setState({ editing: true })}
                  className="btn-block"
                >
                  Editar
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={this.updateUser}
                  className=" btn-block"
                >
                  Actualizar
                </Button>
              )}
            </Col>

            <Col className="col-md-5">
              <Button
                onClick={this.deleteUser}
                variant="danger"
                className="btn-block"
              >
                Borrar
              </Button>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
