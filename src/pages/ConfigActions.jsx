import React from 'react';

class ConfigActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      greenHouse: [],
      growBed: [],
      startHour: '',
      finalHour: '',
      selectedDate: new Date(),
    };
  }

  reload = () => {
    return window.location.replace('');
  };

  getBeds = () => {
    var myHeaders = new Headers();
    myHeaders.append('token', localStorage.getItem('token'));
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://3.22.57.173:3000/api/grow_beds', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let json = JSON.parse(result);
        this.setState({ growBed: json.grow_beds });
        console.log(this.state.growBed);
      })
      .catch((error) => console.log('error', error));
  };

  hourConfig = () => {
    var myHeaders = new Headers();
    myHeaders.append('token', localStorage.getItem('token'));
    var urlencoded = new URLSearchParams();
    urlencoded.append('zone', '1');
    urlencoded.append('greenhouse', this.state.green_house);
    urlencoded.append('growbed', this.state.grow_Bed);
    urlencoded.append('value', '1');
    urlencoded.append('time_init', this.state.starthour);
    urlencoded.append('time_end', this.state.finalHour);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('http://3.22.57.173:3000/api/control/lights', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  finalTime = (e) => {
    console.log(e);
    this.setState({ selectedDate: e });
    let date = new Date(e);
    let str = date.toString('HH:mm:ss');
    let time = str.split(' ')[4];
    this.setState({ finalHour: time });
  };

  startTime = (e) => {
    console.log(e);
    this.setState({ selectedDate: e });
    let date = new Date(e);
    let str = date.toString('HH:mm:ss');
    let time = str.split(' ')[4];
    this.setState({ startHour: time });
  };

  getIdBed = (event, growbed) => {
    this.setState({ grow_bed: growbed.grow_bed });

    console.log(growbed);
  };

  openBlinds = () => {
    this.reload();
    var myHeaders = new Headers();
    myHeaders.append('token', localStorage.getItem('token'));
    var urlencoded = new URLSearchParams();
    urlencoded.append('zone', '1');
    urlencoded.append('greenhouse', this.state.greenhouse);
    urlencoded.append('value', '1');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('http://3.22.57.173:3000/api/control/blinds', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  getIdHouse = (event, greenhouse) => {
    this.setState({ green_house: greenhouse.green_house });

    console.log(greenhouse);
  };

  getHouses = () => {
    var myHeaders = new Headers();
    myHeaders.append('token', localStorage.getItem('token'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://3.22.57.173:3000/api/grow_houses', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let json = JSON.parse(result);
        this.setState({ greenHouse: json.green_houses });
        console.log(this.state.greenHouse);
      })
      .catch((error) => console.log('error', error));
  };
  componentDidMount = () => {
    this.getHouses();
    this.getBeds();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.greenHouse]: e.target.value,
      [e.target.growBed]: e.target.value,
    });
  };

  render() {
    return null;
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
