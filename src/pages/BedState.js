import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Button from '@material-ui/core/Button';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import TextField from '@material-ui/core/TextField';

class BedState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disease: '',
      obs: '',
      bed: '',
    };
  }

  getDiseases = () => {
    var myHeaders = new Headers();
    myHeaders.append('token', localStorage.getItem('token'));
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://3.22.57.173:3000/api/pests', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let json = JSON.parse(result);
        this.setState({ disease: json.pests });
      })
      .catch((error) => console.log('error', error));
  };

  getIdDisaeses = (e, sick) => {
    this.setState({ desease: sick });
  };

  observation = (e) => {
    this.setState({ obs: e.target.value });
  };

  Send = () => {
    console.log(this.state.obs);
    var myHeaders = new Headers();
    myHeaders.append('token', localStorage.getItem('token'));
    var urlencoded = new URLSearchParams();
    urlencoded.append('zone', '1');
    urlencoded.append('greenhouse', '1');
    urlencoded.append('pest', this.state.desease);
    urlencoded.append('observation', this.state.obs);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('http://3.22.57.173:3000/api/inspection/1', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  getEnv = () => {
    var myHeaders = new Headers();
    myHeaders.append('token', localStorage.getItem('token'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://3.22.57.173:3000/api/grow_beds/' + this.props.lacation.result,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let json = JSON.parse(result);
        this.setState({
          temp: json.environment.temperature,
          hum: json.environment.humidity,
          bed: json.growbed,
        });
        console.log(json.environment.temperature);
      })

      .catch((error) => console.log('error', error));
  };

  componentDidMount = () => {
    this.getEnv();
    this.getDiseases();
    setInterval(() => {
      this.getEnv();
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.desease]: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <Box my={1} alignItems="center" justifyContent="center">
          <Typography
            align="center"
            variant="h2"
            style={{ color: 'gray' }}
            gutterBottom
          >
            Bed State
          </Typography>
        </Box>
        <Grid container justify="center">
          <Box
            my={2}
            className="avatar"
            alignItems="center"
            justifyContent="center"
          >
            <LocalFloristIcon style={{ fontSize: 80 }} />
          </Box>
        </Grid>
        <Grid container justify="center">
          <Box my={3}>
            <Typography
              align="center"
              variant="h3"
              style={{ color: 'darkblue' }}
              gutterBottom
            >
              Cama {this.state.bed},Invernadero 1
            </Typography>
            <Typography
              align="center"
              variant="h5"
              style={{ color: 'black' }}
              gutterBottom
            >
              Peste:
            </Typography>
            <Typography
              align="center"
              variant="h5"
              style={{ color: 'red' }}
              gutterBottom
            >
              {this.state.desease}
            </Typography>
          </Box>
        </Grid>
        <Grid container justify="center">
          <Box
            component="div"
            display="inline"
            p={5}
            m={1}
            bgcolor="background.paper"
          >
            <Typography
              align="center"
              variant="h6"
              style={{ color: 'black' }}
              gutterBottom
            >
              humedad: {this.state.hum} %
            </Typography>
          </Box>
          {'   '}

          <Box
            component="div"
            display="inline"
            p={5}
            m={1}
            bgcolor="background.paper"
          >
            <Typography
              align="center"
              variant="h6"
              style={{ color: 'black' }}
              gutterBottom
            >
              temperatura: {this.state.temp}°c
            </Typography>
          </Box>
        </Grid>

        <Grid container justify="center" item>
          <DropdownButton
            id="dropdown-basic-button"
            title="DISEASES"
            onChange={this.selectOption}
          >
            {this.state.disease &&
              this.state.disease.map((sick) => (
                <DropdownItem
                  onClick={(e) => {
                    this.getIdDisaeses(null, sick);
                  }}
                  key={sick}
                >
                  {sick}
                </DropdownItem>
              ))}
          </DropdownButton>
        </Grid>
        <div style={{ padding: 30 }}>
          <Grid container justify="center" item>
            <form noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-multiline-static"
                  label="OBSERVATIONS"
                  onChange={this.observation}
                  multiline
                  rows={8}
                  value={this.setState.value}
                />
              </div>
            </form>
          </Grid>
        </div>
        <div style={{ padding: 30 }}>
          <Grid container justify="center">
            <Button
              onClick={this.Send}
              variant="contained"
              color="primary"
              className="configure"
            >
              SEND
            </Button>
          </Grid>
        </div>

        <Grid container spacing={1}></Grid>
      </div>
    );
  }
}
export default BedState;
