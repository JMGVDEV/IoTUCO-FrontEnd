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
    this.state = {growBedId: '',greenHouseId: '',config: null, open: null}
    this.open = 'open_blinds'
    this.config = 'config_actions'
  }


  handleFiltersChange = (filters) => {
    this.setState({
      growBedId: filters.growBedId,
      greenHouseId: filters.greenHouseId,
    });
  };


  finalTime = (e) => {
    console.log(e);
    this.setState({ selectedDate2: e });
    let date = new Date(e);
    let str = date.toString("HH:mm:ss");
    let time = str.split(" ")[4];
    this.setState({ finalHour: time });
  };

  startTime = (event) => {
    console.log(event);
    this.setState({ selectedDate1: event });
    let date = new Date(event);
    let str = date.toString("HH:mm:ss");
    let time = str.split(" ")[4];
    this.setState({ startHour: time });
  };

  OpenBlinds = (e) => {
    console.log(this.open);
    
  };

  Configure = (e) => {
    console.log(this.config);
    
    
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
                value={this.state.selectedDate1}
                onChange={this.startTime}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                id="final-time-picker"
                label="Final Time"
                value={this.state.selectedDate2}
                onChange={this.finalTime}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid >
          </div>
          <div style={{ padding: 50 }}>
         
          <Row className="justify-content-around w-100 m-0 px-8">
          <Col className="col-md-5">
            <Button
              onClick={this.Configure}
              variant="outlined"
              value="Submit"
              color="primary"
              className=" btn-block"
            >
              CONFIGURE
            </Button>
            <Button
              onClick={this.OpenBlinds}
              variant="outlined"
              value="Submit"
              color="primary"
              className=" btn-block"
            >
              OPEN BLINDS
            </Button>
            </Col>
            </Row>
          
          
        </div>


          </Col>
        </Row>
      </div>
    );
  }
}
export default ConfigActions;


