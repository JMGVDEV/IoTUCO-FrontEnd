import React from 'react';
import { Row, Button, Col, ButtonGroup, Form } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { configLights, configBlinds, configDoor } from '../Utils/Api';
import EMod from '../components/EncryptModal';

class ActionsComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      finalTime: null,
      finalHour: null,
      startHour: null,
      securityCode: null,
    };
  }

  finalTime = (e) => {
    this.setState({ finalTime: e });
    let time = e.toString().split(' ')[4].split(':');
    time = `${time[0]}:${time[1]}:00`;
    this.setState({ finalHour: time });
  };

  startTime = (e) => {
    this.setState({ startTime: e });
    let time = e.toString().split(' ')[4].split(':');
    time = `${time[0]}:${time[1]}:00`;
    this.setState({ startHour: time });
  };

  configDoor = async (value) => {
    let Door_config = {
      zone: 1,
      greenhouse: this.props.greenHouseId,
      value,
    };

    this.props.setLoading(true);
    try {
      await configDoor(Door_config, this.state.securityCode);
      this.props.showNotification(
        'success',
        'Ok',
        'Se cambío el estado de la puerta',
      );
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        'Algo salió mal al abrir o cerrar la puerta',
      );
    }
    this.props.setLoading(false);
  };

  configBlinds = async (value) => {
    let blinds_config = {
      zone: 1,
      greenhouse: this.props.greenHouseId,
      value,
    };

    this.props.setLoading(true);
    try {
      await configBlinds(blinds_config, this.state.securityCode);
      this.props.showNotification(
        'success',
        'Ok',
        'Se cambío el estado de las cortinas',
      );
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        'Algo salió mal al abrir o cerrar las cortinas',
      );
    }
    this.props.setLoading(false);
  };

  Configure = async () => {
    this.props.setLoading(true);
    try {
      let lights_config = {
        zone: 1,
        growbed: this.props.growBedId,
        greenhouse: this.props.greenHouseId,
        value: 100,
        time_init: this.state.startHour,
        time_end: this.state.finalHour,
      };
      await configLights(lights_config, this.state.securityCode);
      this.props.showNotification('success', 'Ok', 'Hora Configurada');
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        'Algo salió mal al configurar la hora',
      );
    }
    this.props.setLoading(false);
  };

  onChangeSecurityCode = (e) => {
    this.setState({ securityCode: e.target.value });
  };

  render() {
    return (
      <div>
        <EMod />
        <Col className="col-md-10">
          <Box my={1} alignItems="center" justifyContent="center">
            <Typography
              align="center"
              variant="h3"
              style={{ color: 'gray' }}
              gutterBottom>
              Seleccionar Horario
            </Typography>
          </Box>
          <div style={{ padding: 50 }}>
            <Grid container justify="space-around">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  inputVariant="outlined"
                  margin="normal"
                  id="start-time-picker"
                  label="Hora Inicial"
                  value={this.state.startTime}
                  onChange={this.startTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />

                <KeyboardTimePicker
                  inputVariant="outlined"
                  variant="primary"
                  margin="normal"
                  id="final-time-picker"
                  label="Hora Final"
                  value={this.state.finalTime}
                  onChange={this.finalTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <div style={{ padding: 10 }}>
              <Button
                onClick={this.Configure}
                variant="btn btn-outline-primary"
                value="Submit"
                size="small"
                color="primary"
                className="btn-lg">
                Configurar
              </Button>
            </div>

            <div style={{ padding: 2 }}>
              <Grid container justify="space-around">
                <Row className="justify-content-around w-120 m-4 px-10 ">
                  <Col className="col-sm-8">
                    <div className="pb-2">
                      <Form.Group>
                        <Form.Control
                          onChange={this.onChangeSecurityCode}
                          type="text"
                          placeholder="Ingrese Código de seguridad"
                          required={true}
                        />
                      </Form.Group>
                    </div>
                  </Col>
                  <Grid container justify="space-around">
                    <ButtonGroup
                      size="large"
                      className="btn-group-vertical btn-group-lg">
                      <Typography
                        align="center"
                        variant="h5"
                        style={{ color: 'gray' }}
                        gutterBottom>
                        Cortinas:
                      </Typography>
                      <Button
                        onClick={() => this.configBlinds(100)}
                        key={100}
                        variant="btn btn-outline-success"
                        value="Submit">
                        Abrir
                      </Button>
                      <Button
                        onClick={() => this.configBlinds(0)}
                        key={0}
                        variant="btn btn-outline-success"
                        value="Submit">
                        Cerrar
                      </Button>
                    </ButtonGroup>

                    <ButtonGroup
                      size="large"
                      className="btn-group-vertical btn-group-lg">
                      <Typography
                        align="center"
                        variant="h5"
                        style={{ color: 'gray' }}
                        gutterBottom>
                        Puerta:
                      </Typography>
                      <Button
                        onClick={() => this.configDoor(100)}
                        key={100}
                        variant="btn btn-outline-success"
                        value="Submit">
                        Abrir
                      </Button>
                      <Button
                        onClick={() => this.configDoor(0)}
                        key={0}
                        variant="btn btn-outline-success "
                        value="Submit">
                        Cerrar
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Row>
              </Grid>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}
export default ActionsComp;
