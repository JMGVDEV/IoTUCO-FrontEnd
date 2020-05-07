import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerQuarter } from '@fortawesome/free-solid-svg-icons';
import { getGrowBeds, getGreenHouses } from '../Utils/Api';

export default class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      growBeds: null,
      greenHouses: null,
      greenHouseId: null,
    };
  }

  componentDidMount = () => {
    this.getGrowBedsAndGreenHouses();
  };

  getGrowBedsAndGreenHouses = async () => {
    let values;

    try {
      values = await Promise.all([getGrowBeds(), getGreenHouses()]);
    } catch (error) {
      return;
    }

    this.allGrowBeds = values[0];

    let greenHouseId = values[1][0].greenhouse;
    let growBeds = this.allGrowBeds.filter(
      (growBed) => growBed.greenhouse == greenHouseId
    );

    this.setState({ greenHouses: values[1], growBeds, greenHouseId });

    this.props.handleFiltersChange({
      growBedId: growBeds[0].growbed,
      greenHouseId: greenHouseId,
    });
  };

  filterGrowBeds = (e) => {
    let greenHouseId = e.target.value;

    let growBeds = this.allGrowBeds.filter(
      (growBed) => growBed.greenhouse == greenHouseId
    );

    this.setState({ growBeds, greenHouseId });

    this.props.handleFiltersChange({
      growBedId: growBeds[0].growbed,
      greenHouseId: greenHouseId,
    });
  };

  handleGrowBedChange = (e) => {
    let growBedId = e.target.value;
    this.props.handleFiltersChange({
      growBedId,
      greenHouseId: this.state.greenHouseId,
    });
  };

  render() {
    return (
      <div>
        <h3>SELECT GROW BED</h3>
        <div className="icon text-center p-0 m-0">
          <FontAwesomeIcon icon={faThermometerQuarter} color="#4D4D4D" />
        </div>

        <Form onSubmit={this.createUser}>
          <Form.Group>
            <Form.Label>GREEN HOUSES</Form.Label>
            <Form.Control
              onChange={this.filterGrowBeds}
              as="select"
              required={true}
            >
              {this.state.greenHouses &&
                this.state.greenHouses.map((green_house, idx) => (
                  <option key={idx} value={green_house.greenhouse}>
                    green house {green_house.greenhouse}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>GROW BEDS</Form.Label>
            <Form.Control
              onChange={this.handleGrowBedChange}
              as="select"
              required={true}
            >
              {this.state.growBeds &&
                this.state.growBeds.map((grow_bed, idx) => (
                  <option key={idx} value={grow_bed.growbed}>
                    grow bed {grow_bed.growbed}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
