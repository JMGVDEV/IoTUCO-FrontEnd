import React from 'react';
import NavBarDark from '../components/NavBarDark';
import { Row, Col } from 'react-bootstrap';
import Filters from '../components/Filters';
import Graphs from '../components/Graphs';
import '../styles/home.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      growbed_id: null,
      interval: 3,
    };
  }

  handleIntervalChange = (e) => {
    this.setState({ interval: e.target.value });
  };

  handleGrowBedChange = (e) => {
    this.setState({ growbed_id: e.target.value });
  };

  setGrowBedId = (id) => {
    this.setState({ growbed_id: id });
  };

  render() {
    return (
      <div className="body">
        <NavBarDark />

        <Row className="content">
          <Col className="col-md-4 w-100 shadow-lg filters">
            <Filters
              handleGrowBedChange={this.handleGrowBedChange}
              handleIntervalChange={this.handleIntervalChange}
              setGrowBedId={this.setGrowBedId}
            />
          </Col>
          <Col className="col-md-8">
            <Graphs
              interval={this.state.interval}
              growbed_id={this.state.growbed_id}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;

/**
 


 */
