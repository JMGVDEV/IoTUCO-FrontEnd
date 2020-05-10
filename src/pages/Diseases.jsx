import React from 'react';
import NavBarDark from '../components/NavBarDark';
import { Row, Col, Spinner } from 'react-bootstrap';
import Filters from '../components/Filters';
import DiseaseForm from '../components/DiseaseForm';
import Typography from '@material-ui/core/Typography';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class Diseases extends React.Component {
  constructor(props) {
    super(props);
    this.checkedDiseases = [];
    this.state = {
      growBedId: null,
      greenHouseId: null,
      loading: false,
    };
  }

  handleFiltersChange = (filters) => {
    this.setState({
      growBedId: filters.growBedId,
      greenHouseId: filters.greenHouseId,
    });
  };

  setLoading = (loading) => {
    this.setState({ loading: loading });
  };

  showNotification = (type, title, message) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, title, 5000);
        break;
      case 'error':
        NotificationManager.error(message, title, 5000);
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div className="body">
        <NavBarDark />
        <NotificationContainer />
        <Row className="content">
          <Col className="col-md-3 w-100 shadow-lg pt-1 mt-4 text-center justify-content-center">
            <Filters handleFiltersChange={this.handleFiltersChange} />
          </Col>
          <Col className="col-md-8 px-5">
            <div>
              <div className="pt-3 text-center">
                <Typography
                  align="center"
                  variant="h3"
                  style={{ color: 'gray' }}
                  gutterBottom>
                  Cama {this.state.growBedId}
                </Typography>
              </div>
            </div>
            <DiseaseForm
              showNotification={this.showNotification}
              setLoading={this.setLoading}
              growBedId={this.state.growBedId}
              greenHouseId={this.state.greenHouseId}
            />
            {this.state.loading && (
              <div className="justify-content-center d-flex py-5">
                <Spinner animation="border" role="status"></Spinner>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
