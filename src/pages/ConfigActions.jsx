import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import NavBarDark from '../components/NavBarDark';
import Filters from '../components/Filters';
import ActionsComp from '../components/FunctionActions';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class ConfigActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      growBedId: null,
      greenHouseId: null,
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
          <Col className="col-md-3 w-100 shadow-lg pt-3 mt-3 text-center justify-content-center">
            <Filters handleFiltersChange={this.handleFiltersChange}></Filters>
          </Col>
          <Col className="col-md-9 px-10 text-center justify-content-center">
            <ActionsComp
              growBedId={this.state.growBedId}
              greenHouseId={this.state.greenHouseId}
              showNotification={this.showNotification}
              setLoading={this.setLoading}
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
export default ConfigActions;
