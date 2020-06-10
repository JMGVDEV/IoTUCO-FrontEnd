import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { createUser } from '../Utils/Api';
import Typography from '@material-ui/core/Typography';
import QRgen from '../components/QRgenerator';
import zxcvbn from 'zxcvbn';
import { id } from 'date-fns/esm/locale';
import PasswordStrengthBar from 'react-password-strength-bar';

export default class CreateUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { role: 'admin' },
      twoFactorUrl: '',
      show: false,
      BoxDisable: true,
    };
  }

  handleClose = () => {
    this.setState({ show: false, twoFactorUrl: '' });
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
      let twoFactorUrl = await createUser(user);
      this.setState({ twoFactorUrl });
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

  onChangePassword = (e) => {
    this.setState({
      user: { ...this.state.user, password: e.target.value },
    });
    var auth = zxcvbn(e.target.value);
    console.log(auth.score);
    console.log(auth);
    if (auth.score > 2) {
      this.setState({ BoxDisable: false });
    } else {
      this.setState({ BoxDisable: true });
    }
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
            Crear Usuario:
          </Typography>
        </div>
        <div>
          <Typography
            align="center"
            variant="h6"
            style={{ color: 'gray' }}
            gutterBottom>
            Los campos: "Nombre", "Correo Electrónico, "Contraseña" y "Confirmar
            Contraseña" son obligatorios; y debe ingresar una contraseña
            "aceptable" según la barra de progreso para habilitar la creación de
            usuarios.
          </Typography>
        </div>
        <div className="pt-5 text-center">
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
                    placeholder="Ingrese Nombre"
                    required={true}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4">
                <Form.Group>
                  <Form.Label>Apellidos:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, last_name: e.target.value },
                      })
                    }
                    value={this.state.user.last_name}
                    type="text"
                    placeholder="Ingrese Apellidos"
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
                    placeholder="Ejemplo: usuario@dominio.com"
                    required={true}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-4 pt-3">
                <Form.Group>
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    onChange={this.onChangePassword}
                    value={this.state.user.password}
                    type="password"
                    name="password"
                    placeholder="Ingrese una Contraseña Aceptable"
                    required={true}
                    minLength={8}
                  />
                  <PasswordStrengthBar
                    className="customClass"
                    minLength={8}
                    minScore={2}
                    shortScoreWord={'Nula'}
                    scoreWords={[
                      'Nula',
                      'Muy Débil',
                      'Débil',
                      'Aceptable',
                      'Fuerte',
                    ]}
                    password={this.state.user.password}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4 pt-3">
                <Form.Group>
                  <Form.Label>Confirmar Contraseña:</Form.Label>
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
                    placeholder="************"
                    required={true}
                  />
                </Form.Group>
              </Col>

              <Col className="col-sm-4 pt-3">
                <Form.Group>
                  <Form.Label>Seleccionar Rol:</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setState({
                        user: { ...this.state.user, role: e.target.value },
                      })
                    }
                    as="select"
                    required={true}>
                    <option value="admin">Administrador</option>
                    <option value="viewer">Observador</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-15">
                <div className="d-flex justify-content-center pt-5">
                  <Button
                    type="submit"
                    disabled={this.state.BoxDisable}
                    value="Submit"
                    variant="btn btn-outline-primary"
                    className="btn-block w-50 ">
                    Crear
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
          <QRgen
            TwoFactorUrl={this.state.twoFactorUrl}
            handleClose={this.handleClose}
            show={this.state.show}
          />
        </div>
      </React.Fragment>
    );
  }
}
