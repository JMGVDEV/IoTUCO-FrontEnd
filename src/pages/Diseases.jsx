import React from 'react';
import NavBarDark from '../components/NavBarDark';
import { Row, Col } from 'react-bootstrap';

export default class Diseases extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
        <NavBarDark />

        <Row className="content">
          <Col className="col-md-4 w-100 shadow-lg pt-3 mt-4 text-center justify-content-center">
            AQUI VAN LOS FILTROS DE LA CAMA :)
          </Col>
          <Col className="col-md-8">AQUI VA LA PARTE DE LAS ENFERMEDADES DE LAS PLANTAS</Col>
        </Row>
      </div>
    );
  }
}

/*<div className="container">
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
      </div>*/
