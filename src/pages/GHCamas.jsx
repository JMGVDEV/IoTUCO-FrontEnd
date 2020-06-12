import React from 'react';
import ReactApexChart from 'react-apexcharts';
import NavBarDark from '../components/NavBarDark';
import Filters from '../components/Filters';
import { Row, Col } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { getDiseasesCount } from '../Utils/Api';
import Grid from '@material-ui/core/Grid';

export default class DB4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'Humedead',
                data: [31, 40, 28, 51, 42, 109, 100],
               
            }, {
                name: 'temperatura',
                data: [11, 32, 45, 32, 34, 52, 41],
               
            }],

            options: {
                theme: {
                    palette: 'palette6' // upto palette10
                  },
                chart: {
                    height: 350,
                    type: 'area'
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T10:30:00.000Z"]
                
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
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
                    <Col className="col-md-9 px-10 text-center pt-3 mt-10 justify-content-center">
                        <div className="pt-1 text-center">
                            <Typography
                                align="center"
                                variant="h3"
                                style={{ color: 'gray' }}
                                gutterBottom>
                                Invernadero {this.state.greenHouseId} - Cama{' '}
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
        )
    }
}