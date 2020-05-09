import React from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';

class ActionsComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { growBedId: '', greenHouseId: '', config: null, open: null, configure:'' }
        this.open = 'open_blinds'
        this.config = 'config_actions'
    }

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
        try {
            this.props.setLoading(true);   
            this.props.showNotification("success", "Ok", "Abriendo Cortinas");
            this.props.setLoading(false);
          } catch (error) {
            this.props.showNotification(
              "error",
              "Error",
              "Algo salió mal al abrir las cortinas"
            );
            this.props.setLoading(false);
          }
          this.setState({ editing: false });
    };

    Configure = async () => {
        console.log(this.config);
        try {
          this.props.setLoading(true);   
          this.props.showNotification("success", "Ok", "Hora Configurada");
          this.props.setLoading(false);
        } catch (error) {
          this.props.showNotification(
            "error",
            "Error",
            "Algo salió mal al configurar la hora"
          );
          this.props.setLoading(false);
        }
        this.setState({ editing: false });

    };
    render() {
        return (
            <div className="body">
                 <Col className="col-md-10">
                        <Box my={1} alignItems="center" justifyContent="center">
                            <Typography
                                align="center"
                                variant="h3"
                                style={{ color: "gray" }}
                                gutterBottom
                            >
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
                                        value={this.state.selectedDate1}
                                        onChange={this.startTime}
                                        KeyboardButtonProps={{
                                            "aria-label": "change time",
                                        }}
                                    />

                                    <KeyboardTimePicker
                                        inputVariant="outlined"
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
                                <Col className="col-md-3">
                                    <Button
                                        onClick={this.Configure}
                                        variant="btn btn-outline-primary"
                                        value="Submit"
                                        color="primary"
                                        className=" btn-block"
                                    >
                                        CONFIGURE
                                    </Button>
                                    </Col>
                                <Col className="col-sm-3">
                                    <Button
                                        onClick={this.OpenBlinds}
                                        variant="btn btn-outline-success"
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
            </div>
        );
    }
}
export default ActionsComp;
