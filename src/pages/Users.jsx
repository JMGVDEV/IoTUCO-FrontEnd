import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import NavBarDark from '../components/NavBarDark';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import UserCard from '../components/UserCard';
import CreateUserForm from '../components/CreateUserForm';

import * as api from '../Utils/Api';
import 'react-notifications/lib/notifications.css';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
    };
  }

  componentWillMount = () => {
    this.refreshUsers();
  };

  refreshUsers = async () => {
    this.setLoading(true);
    try {
      let users = await api.getAllUsers();
      this.setState({ users, selected_user: users[0] });
      this.setLoading(false);
    } catch (e) {
      console.log('Error fetching users' + e);
      this.setLoading(false);
    }
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
      <React.Fragment>
        <NavBarDark></NavBarDark>
        <NotificationContainer />

        <Row className="mt-2 mx-2">
          <Col className="col-sm-3">
            <UserCard
              users={this.state.users}
              refreshUsers={this.refreshUsers}
              showNotification={this.showNotification}
              setLoading={this.setLoading}
            />
          </Col>

          <Col className="col-md-9 d-flex flex-column justify-content-stretch align-items-stretch">
            <CreateUserForm
              refreshUsers={this.refreshUsers}
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
      </React.Fragment>
    );
  }
}
