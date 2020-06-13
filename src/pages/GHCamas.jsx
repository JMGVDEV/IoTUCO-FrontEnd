import React from 'react';
import ReactApexChart from 'react-apexcharts';
import NavBarDark from '../components/NavBarDark';
import Filters from '../components/Filters';
import { Row, Col } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { getHistoricalEnvironment } from '../Utils/Api';

export default class DB4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],

      options: {
        theme: {
          palette: 'palette6', // upto palette10
        },
        chart: {
          height: 350,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    };
  }

  handleFiltersChange = (filters) => {
    this.setState({
      growBedId: filters.growBedId,
      greenHouseId: filters.greenHouseId,
    });

    this.getData(filters.greenHouseId, filters.growBedId);
  };

  getData = async (greenhouse, growbed) => {
    try {
      let res = await getHistoricalEnvironment(greenhouse, growbed);
      this.setState({
        series: res.data.series,
        options: { xaxis: { categories: res.data.date } },
      });
    } catch (error) {
      return;
    }
  };

  render() {
    return (
      <div className="body">
        <NavBarDark />
        <Row className="content">
          <Col className="col-md-3 w-100 shadow-lg pt-3 mt-3 ">
            <Filters handleFiltersChange={this.handleFiltersChange}></Filters>
          </Col>
          <Col className="col-md-9 px-10 text-center pt-3 mt-10 justify-content-center">
            <div className="pt-1 text-center">
              <Typography
                align="center"
                variant="h3"
                style={{ color: 'gray' }}
                gutterBottom>
                Variables ambientales Invernadero {this.state.greenHouseId} cama{' '}
                {this.state.growBedId}
              </Typography>
            </div>

            <div id="chart">
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="area"
                height={350}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
