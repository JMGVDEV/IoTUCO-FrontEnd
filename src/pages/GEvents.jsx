import React from 'react';
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

export default class DB2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      growBedId: null,
      greenHouseId: null,
      series: [
        {
          name: 'Apertura de Puertas',
          data: [44, 55, 41, 37, 22, 43],
        },
        {
          name: 'Cierre de puertas',
          data: [53, 32, 33, 52, 13, 43],
        },
        {
          name: 'Apertura de Cortinas',
          data: [12, 17, 11, 9, 15, 11],
        },
        {
          name: 'Cierre de Cortinas',
          data: [9, 7, 5, 8, 6, 9],
        },
        {
          name: 'Encendido de Luces',
          data: [25, 12, 19, 32, 25, 24],
        },
        {
          name: 'Apagado de Luces',
          data: [25, 12, 19, 32, 25, 24],
        },
      ],
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
          categories: [
            'Hace ' +
              formatDistance(subDays(new Date(), 5), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 4), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 3), new Date(), {
                locale: es,
              }),
            'Hace ' +
              formatDistance(subDays(new Date(), 2), new Date(), {
                locale: es,
              }),
            formatRelative(subDays(new Date(), 1), new Date(), { locale: es }),
            formatRelative(subDays(new Date(), 0), new Date(), { locale: es }),
          ],
          labels: {
            formatter: function (val) {
              return val;
            },
          },
          title: {
            text: 'Eventos Totales',
          },
        
        },
        yaxis: {
          title: {
            text: 'Día',
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
          palette: 'palette4', // upto palette10
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
                height={500}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
