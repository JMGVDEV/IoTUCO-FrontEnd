import React, { Component } from "react";
import GaugeChart from "react-gauge-chart";
import { Row, Col } from "react-bootstrap";
import { getGrowBedEnvironment } from "../Utils/Api";
import "../styles/graphs.css";

export default class Graphs extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      temperature: null,
      humidity: null,
    };
  }

  componentDidMount = () => {
    this.getEnvironmentData();
    this.interval = setInterval(
      this.getEnvironmentData,
      this.props.interval * 1000
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.interval == prevProps.interval) {
      return;
    }
    clearInterval(this.interval);
    this.interval = setInterval(
      this.getEnvironmentData,
      this.props.interval * 1000
    );
  };

  getEnvironmentData = async () => {
    if (!this.props.growBedId) {
      return;
    }
    try {
      let environment = await getGrowBedEnvironment(this.props.growBedId);
      this.setState({
        temperature: environment.temperature / 100,
        humidity: environment.humidity / 100,
      });
    } catch (error) {
      return;
    }
  };

  render() {
    return (
      <div className="mt-4 text-center">
        <h3>Variables Ambientales:</h3>

        <Row className=" pt-5 justify-content-center">
          <Col>
            <GaugeChart
              animDelay={5}
              nrOfLevels={20}
              textColor="#777777"
              id="gauge-chart1"
              className="gauge"
              percent={this.state.temperature}
              formatTextValue={(value) => value + "°"}
            />
            <h3>Temperatura (°C)</h3>
          </Col>

          <Col>
            <GaugeChart
              animDelay={5}
              nrOfLevels={20}
              percent={this.state.humidity}
              textColor="#777777"
              id="gauge-chart2"
              formatTextValue={(value) => value + "%"}
            />
            <h3>Humedad (%)</h3>
          </Col>
        </Row>
      </div>
    );
  }
}
