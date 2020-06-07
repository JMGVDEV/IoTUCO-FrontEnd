import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import NavBarDark from '../components/NavBarDark';
import Filters from '../components/Filters';
import { Row, Col } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  formatDistanceToNow,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { toDate } from 'date-fns/esm';

export default class DB3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      growBedId: null,
      greenHouseId: null,
      series: [
        {
          name: 'Grados día',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70],
        },
      ],
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
          categories: [
            format(new Date(), "'Hoy' iiii", {
              locale: es,
            }),
            'Hace ' +
              formatDistance(subDays(new Date(), 1), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 2), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 3), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 4), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 5), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 6), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 7), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 8), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 9), new Date(), {
                locale: es,
              }),
          ],

          title: {
            text: 'Época de evaluación (días)',
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
    };
  }

  handleFiltersChange = (filters) => {
    this.setState({
      growBedId: filters.growBedId,
      greenHouseId: filters.greenHouseId,
    });
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
