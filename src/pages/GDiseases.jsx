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
            greenHouseId: null,
            series: [20, 25, 5, 40, 10],
            options: {
                theme: {
                    palette: 'palette1' // upto palette10
                  },
                plotOptions: {
                    pie: {
                        customScale: 0.7,
                        donut: {
                          size: '60%'
                        }
                      }
                  },
                chart: {
                    
                    type: 'donut',
                },
                labels: ['   roya', 'gusanos', ' moscos', 'sanchez', '   trips'],
                legend: {
                    onItemClick: {
                        toggleDataSeries: true
                      },
                      horizontalAlign:'center',
                    position: 'top'
                },
                responsive: [{
                    breakpoint: 100,
                    options: {
                        chart: {
                           
                            width: 500
                        },

                    }
                }],

                    dataLabels: {
                        style: {
                            fontSize: '25px',
                            fontWeight: 'bold',
                          },
                      enabled: true,
                      formatter: function (val) {
                        return val + "%"
                      }
                  }
                }


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
                            <Grid container justify="space-around">
                            <div className="pt-1 text-center" id="chart">
                            <ReactApexChart
                                options={this.state.options}
                                series={this.state.series}
                                type="donut"
                                width={700}
                            />
                        </div>
                        </Grid>
                        
                    </Col>
                    
                </Row>
            </div>


        )
    }

}