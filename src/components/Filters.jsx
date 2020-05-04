import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerQuarter } from '@fortawesome/free-solid-svg-icons';
import { getGrowBeds, getGreenHouses } from '../Utils/Api';

export default class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grow_beds: null,
      green_houses: null,
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

    this.setState({ green_houses: values[1] });
    this.all_grow_beds = values[0];

    let green_house = values[1][0].greenhouse;
    let grow_beds = this.all_grow_beds.filter(
      (grow_bed) => grow_bed.greenhouse == green_house
    );

    this.setState({ grow_beds });
    this.props.setGrowBedId(grow_beds[0].growbed);
  };

  filterGrowBeds = (e) => {
    let green_house = e.target.value;

    let grow_beds = this.all_grow_beds.filter(
      (grow_bed) => grow_bed.greenhouse == green_house
    );

    this.setState({ grow_beds });
    this.props.setGrowBedId(grow_beds[0].growbed);
  };

  render() {
    return (
      <div>
        <h3>Seleccione una cama</h3>
        <div className="icon text-center p-0 m-0">
          <FontAwesomeIcon icon={faThermometerQuarter} color="#4D4D4D" />
        </div>

        <Form onSubmit={this.createUser}>
          <Form.Group>
            <Form.Label>Invernadero</Form.Label>
            <Form.Control
              onChange={this.filterGrowBeds}
              as="select"
              required={true}
            >
              {this.state.green_houses &&
                this.state.green_houses.map((green_house, idx) => (
                  <option key={idx} value={green_house.greenhouse}>
                    Invernadero {green_house.greenhouse}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Cama</Form.Label>
            <Form.Control
              onChange={this.props.handleGrowBedChange}
              as="select"
              required={true}
            >
              {this.state.grow_beds &&
                this.state.grow_beds.map((grow_bed, idx) => (
                  <option key={idx} value={grow_bed.growbed}>
                    Cama {grow_bed.growbed}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicRangeCustom">
            <Form.Label>Refrescar cada (segundos)</Form.Label>
            <Form.Control
              defaultValue="3"
              type="number"
              max="30"
              min="1"
              onChange={this.props.handleIntervalChange}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
