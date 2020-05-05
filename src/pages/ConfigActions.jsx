import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NavBarDark from '../components/NavBarDark';

class ConfigActions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
        <NavBarDark />

        <Row className="content">
          <Col className="col-md-4 w-100 shadow-lg pt-3 mt-4 text-center justify-content-center">
            AQUI VAN LOS FILTROS DE LA CAMA O el invernadero
          </Col>
          <Col className="col-md-8">AQUI SE CONFUGURAN LAS ACCIONES</Col>
        </Row>
      </div>
    );
  }
}
export default ConfigActions;

/*
<div className="container">
<Box my={1} alignItems="center" justifyContent="center">
  <Typography
    align="center"
    variant="h2"
    style={{ color: 'gray' }}
    gutterBottom
  >
    Configure Actions
  </Typography>
</Box>
<Grid container justify="center">
  <Box
    my={2}
    className="avatar"
    alignItems="center"
    justifyContent="center"
  >
    <SettingsApplicationsOutlinedIcon style={{ fontSize: 80 }} />
  </Box>
</Grid>
<Grid container justify="center">
  <DropdownButton
    id="dropdown-basic-button"
    title="CAMAS"
    onChange={this.selectOption}
  >
    {this.state.growBed &&
      this.state.growBed.map((growbed) => (
        <DropdownItem
          onClick={(e) => {
            this.getIdBed(e, growbed);
          }}
          key={growbed.grow_bed}
        >
          CAMA {growbed.growbed}
        </DropdownItem>
      ))}
  </DropdownButton>
</Grid>
<div style={{ padding: 50 }}>
  <Grid container justify="space-around">
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin="normal"
        id="start-time-picker"
        label="Start Time"
        value={this.state.selectedDate}
        onChange={this.startTime}
        KeyboardButtonProps={{
          'aria-label': 'change time',
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
          'aria-label': 'change time',
        }}
      />
    </MuiPickersUtilsProvider>
  </Grid>
</div>
<div style={{ padding: 30 }}>
  <Grid container justify="center">
    <Button
      onClick={this.hourConfig}
      variant="contained"
      color="primary"
      className="configure"
    >
      CONFIGURAR
    </Button>
  </Grid>
</div>

<Grid container justify="center">
  <div className="btn-group">
    <DropdownButton
      id="dropdown-basic-button"
      title="INVERNADEROS"
      onChange={this.selectOption}
    >
      {this.state.greenHouse &&
        this.state.greenHouse.map((greenhouse) => (
          <DropdownItem
            onClick={(e) => {
              this.getIdHouse(e, greenhouse);
            }}
            key={greenhouse.green_house}
          >
            INVERNADERO {greenhouse.greenhouse}
          </DropdownItem>
        ))}
    </DropdownButton>
    <Button></Button>
    <Button
      onClick={this.openBlinds}
      variant="contained"
      color="primary"
      className="config"
    >
      ABRIR CORTINAS
    </Button>{' '}
  </div>
</Grid>
<Grid container spacing={1}></Grid>
</div>*/
