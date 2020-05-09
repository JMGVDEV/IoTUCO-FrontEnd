import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { createUser } from '../Utils/Api';
import Typography from '@material-ui/core/Typography';
import QRgen from '../components/QRgenerator';

export default class CreateUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { role: 'admin' },
      IDcode: '123456',
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow() {
    this.setState({ show: true });
  }

  createUser = async (event) => {
    event.preventDefault();

    if (this.state.user.password !== this.state.user.password_v) {
      this.props.showNotification(
        'error',
        'Error',
        'Las contraseñas no coinciden',
      );
      return;
    }

    let user = this.state.user;

    this.props.setLoading(true);

    try {
      await createUser(user);
      this.props.refreshUsers();
      this.handleShow();
      this.props.showNotification(
        'success',
        'Ok',
        'El usuario se ha creado satisfactoriamente',
      );
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        '¡Ups!, algo salió mal al crear el usuario',
      );
    }

    this.props.setLoading(false);
  };

  render() {
    return (
      <React.Fragment>
        <div className="pt-4 text-center">
          <Typography
            align="center"
            variant="h3"
            style={{ color: 'gray' }}
            gutterBottom>
            Create User:
          </Typography>
        </div>
        <div className="pt-5 text-center">
          <Form onSubmit={this.createUser}>
            <Row>
              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, name: e.target.value },
                      })
                    }
                    value={this.state.user.name}
                    type="text"
                    placeholder="Enter Name"
                    required={true}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, last_name: e.target.value },
                      })
                    }
                    value={this.state.user.last_name}
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, email: e.target.value },
                      })
                    }
                    value={this.state.user.email}
                    type="email"
                    placeholder="Enter e-mail"
                    required={true}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-4 pt-3">
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, password: e.target.value },
                      })
                    }
                    value={this.state.user.password}
                    type="password"
                    placeholder="Enter Password"
                    required={true}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4 pt-3">
                <Form.Group>
                  <Form.Label>Confirm Password:</Form.Label>
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
                    placeholder="Password"
                    required={true}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4 pt-3">
                <Form.Group>
                  <Form.Label>Select Role:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, role: e.target.value },
                      })
                    }
                    as="select"
                    required={true}>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-15">
                <div className="d-flex justify-content-center pt-5">
                  <Button
                    type="submit"
                    value="Submit"
                    variant="btn btn-outline-primary"
                    className="btn-block w-50 ">
                    Create
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
          <QRgen
            IDcode={this.state.IDcode}
            handleClose={this.handleClose}
            show={this.state.show}
          />
        </div>
      </React.Fragment>
    );
  }
}
