import React from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { configLights, configBlinds } from '../Utils/Api';
import EMod from '../components/EncryptModal';

class ActionsComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      finalTime: null,
      finalHour: null,
      startHour: null,
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

  configBlinds = async (value) => {
    let blinds_config = {
      zone: 1,
      greenhouse: this.props.greenHouseId,
      value,
    };

    this.props.setLoading(true);
    try {
      await configBlinds(blinds_config);
      this.props.showNotification(
        'success',
        'Ok',
        'Se Cambío el estado de las cortinas',
      );
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        'Algo salió mal al abrir las cortinas',
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
      await configLights(lights_config);
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
              Select Hour
            </Typography>
          </Box>
          <div style={{ padding: 90 }}>
            <Grid container justify="space-around">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  inputVariant="outlined"
                  margin="normal"
                  id="start-time-picker"
                  label="Start Time"
                  value={this.state.startTime}
                  onChange={this.startTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />

                <KeyboardTimePicker
                  inputVariant="outlined"
                  margin="normal"
                  id="final-time-picker"
                  label="Final Time"
                  value={this.state.finalTime}
                  onChange={this.finalTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </div>
          <div style={{ padding: 10 }}>
            <Row className="justify-content-around w-100 m-0 px-8">
              <Col className="col-md-3">
                <Button
                  onClick={this.Configure}
                  variant="btn btn-outline-primary"
                  value="Submit"
                  color="primary"
                  className=" btn-block">
                  CONFIGURE
                </Button>
              </Col>
              <Col className="col-sm-3">
                <Button
                  onClick={() => this.configBlinds(100)}
                  key={100}
                  variant="btn btn-outline-success"
                  value="Submit"
                  color="primary"
                  className=" btn-block">
                  OPEN BLINDS
                </Button>
              </Col>
              <Col className="col-sm-3">
                <Button
                  onClick={() => this.configBlinds(0)}
                  key={0}
                  variant="btn btn-outline-success"
                  value="Submit"
                  color="primary"
                  className=" btn-block">
                  Cerrar Cortinas
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </div>
    );
  }
}
export default ActionsComp;
