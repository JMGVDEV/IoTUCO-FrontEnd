import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NavBarDark from '../components/NavBarDark';
import Filters from '../components/Filters'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  } from '@material-ui/pickers';

class ConfigActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {growbed_id: ''}
  }


  handleFiltersChange = (filters) => {
    this.setState({
      growBedId: filters.growBedId,
      greenHouseId: filters.greenHouseId,
    });
  };


  finalTime = (e) => {
    console.log(e);
    this.setState({ selectedDate: e });
    let date = new Date(e);
    let str = date.toString("HH:mm:ss");
    let time = str.split(" ")[4];
    this.setState({ finalHour: time });
  };

  startTime = (e) => {
    console.log(e);
    this.setState({ selectedDate: e });
    let date = new Date(e);
    let str = date.toString("HH:mm:ss");
    let time = str.split(" ")[4];
    this.setState({ startHour: time });
  };

  render() {
    return (
      <div className="body">
        <NavBarDark />

        <Row className="content">
          <Col className="col-md-4 w-100 shadow-lg pt-3 mt-4 text-center justify-content-center">
            <Filters handleFiltersChange={this.handleFiltersChange} ></Filters>
          </Col>

          <Col className="col-md-8">
          <Box my={1} alignItems="center" justifyContent="center">
          <Typography
            align="center"
            variant="h3"
            style={{ color: "gray" }}
            gutterBottom
          >
            SELECT HOUR
          </Typography>
        </Box>
        <div style={{ padding: 90 }}>
          <Grid container justify="space-around">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                id="start-time-picker"
                label="Start Time"
                value={this.state.selectedDate}
                onChange={this.startTime}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                id="final-time-picker"
                label="Final Time"
                value={this.state.selectedDate}
                onChange={this.finalTime}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          </div>
          <div style={{ padding: 90 }}>
          <Grid container justify="center">
            <Button
              onClick=''
              variant="contained"
              color="primary"
              className="configure"
            >
              CONFIGURE
            </Button>{" "}
                <Button></Button>
            <Button
              onClick=''
              variant="contained"
              color="primary"
              className="config"
            >
              OPEN BLINDS
            </Button>{" "}
          </Grid>
        </div>


          </Col>
        </Row>
      </div>
    );
  }
}
export default ConfigActions;


