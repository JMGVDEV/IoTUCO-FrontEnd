import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import NavBarDark from '../components/NavBarDark';
import Filters from '../components/Filters';
import { Row, Col } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { getDegreesDay } from '../Utils/Api';

export default class DB3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      growBedId: null,
      greenHouseId: null,
      series: [],
      options: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '25%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [],
          type: 'datetime',
          labels: {
            rotate: -45,
            format: undefined,
            formatter: undefined,
            datetimeUTC: true,
            datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
            },
          },
          title: {
            text: 'Época de evaluación (días)',
            offsetY: 10,
          },
        },
        yaxis: {
          title: {
            text: 'Grados día',
          },
        },
        fill: {
          opacity: 1,
        },
        theme: {
          palette: 'palette1', // upto palette10
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' (°C)';
            },
          },
        },
      },
      toggle: true,
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
      let res = await getDegreesDay(greenhouse, growbed);

      this.setState({
        series: [{ name: 'Grados día', data: res.data.degrees }],
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
                Invernadero {this.state.greenHouseId} - Cama{' '}
                {this.state.growBedId}
              </Typography>
            </div>
            <div id="chart">
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                height={300}
                width={950}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
