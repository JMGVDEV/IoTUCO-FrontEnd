import React from 'react';
import ReactApexChart from 'react-apexcharts';
import NavBarDark from '../components/NavBarDark';
import Filters from '../components/Filters';
import { Row, Col } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { getEvents } from '../Utils/Api';

export default class DB2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      growBedId: null,
      greenHouseId: null,
      series: [],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            endingShape: 'rounded',
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        title: {
          text: 'Eventos del Sistema',
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Eventos Totales',
          },
        },
        yaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: true,
            datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
            },
          },

          title: {
            text: 'Fecha',
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        fill: {
          opacity: 1,
        },
        theme: {
          palette: 'palette1', // upto palette10
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 80,
        },
      },
    };
  }

  handleFiltersChange = (filters) => {
    this.setState({
      growBedId: filters.growBedId,
      greenHouseId: filters.greenHouseId,
    });
    this.getData(filters.greenHouseId);
  };

  getData = async (greenhouse) => {
    try {
      let res = await getEvents(greenhouse);
      this.setState({
        series: res.data.series,
        options: {
          xaxis: {
            categories: res.data.date,
          },
        },
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
          <Col className="col-md-9 px-10 text-center justify-content-center">
            <div className="pt-3 text-center">
              <Typography
                align="center"
                variant="h3"
                style={{ color: 'gray' }}
                gutterBottom>
                Invernadero {this.state.greenHouseId}
              </Typography>
            </div>
            <div id="chart">
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                height={350}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
