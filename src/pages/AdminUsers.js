import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Back from '../components/Back'
import Grid from '@material-ui/core/Grid'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'
import Dropdown from 'react-bootstrap/Dropdown'
import { FormGroup, FormControl } from "react-bootstrap"
import Button from '@material-ui/core/Button'
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import '../components/styles/StylesWelcome.css'

class AdminUsers extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[],name:'',lastname:'',email:'',role:'role'
        }
    }
    

    deleteUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4NDg5Njg1MiwiZXhwIjoxNTg2MTkyODUyfQ.hqbfxwzcUGKKwMTzDY2wq6es5h0zyrV-qTIWiyVnzoY");

        var urlencoded = new URLSearchParams();

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://3.22.57.173:3000/api/users/" + this.state.id, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    getId = (event, user) => {
        this.setState({ id: user.id, name: user.name, lastname: user.last_name?user.last_name:'', email: user.email, role: user.role})

        console.log(user)

    }

    updateUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4NDg5Njg1MiwiZXhwIjoxNTg2MTkyODUyfQ.hqbfxwzcUGKKwMTzDY2wq6es5h0zyrV-qTIWiyVnzoY");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", this.state.name);
        urlencoded.append("last_name", this.state.lastname);
        urlencoded.append("email", this.state.email);
        urlencoded.append("role", this.state.role);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        fetch("http://3.22.57.173:3000/api/users/" + this.state.id, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    onChangeRole = (e) => {
        this.setState({ role: e.target.value })
    }

    onChangeName = (event) => {
        this.setState({ name: event.target.value })
    }
    onChangeLastname = (event) => {
        this.setState({ lastname: event.target.value })
    }
    onChangeEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    onChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    registerUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg1NDM5OTI1LCJleHAiOjE1ODY3MzU5MjV9.2tTKEVTFJWVJvrehmxgTQXoKOQFlQN_Z3sXmB7cj3XA");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", this.state.name);
        urlencoded.append("last_name", this.state.lastname);
        urlencoded.append("email", this.state.email);
        urlencoded.append("password", this.state.password);
        urlencoded.append("role", this.state.role);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://3.22.57.173:3000/api/users/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    componentDidMount = () => {
        var myHeaders = new Headers();
        myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg1NDM5OTI1LCJleHAiOjE1ODY3MzU5MjV9.2tTKEVTFJWVJvrehmxgTQXoKOQFlQN_Z3sXmB7cj3XA");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://3.22.57.173:3000/api/users/", requestOptions)
            .then(response => response.text())
            .then(result => {
                let json = JSON.parse(result)
                console.log(json)
                this.setState({ users: json.users })
            })
            .catch(error => console.log('error', error));
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        return (

            <div className="container">


                <Box my={1} alignItems="center" justifyContent="center">
                    <Typography align='center' variant="h2" style={{ color: 'gray' }} gutterBottom>
                        Admin Users
                    </Typography>
                </Box>
                <Grid container justify="center" >
                    <Box my={2} className='avatar' alignItems="center" justifyContent="center" >
                        <SupervisorAccountOutlinedIcon style={{ fontSize: 80 }} />
                    </Box>
                </Grid>
                <Grid container justify="center" >
                    <DropdownButton id="dropdown-basic-button" title="Registered Users" onChange={this.selectOption}>
                        {this.state.users && (this.state.users.map(user => <DropdownItem onClick={(e)=>{this.getId(e,user)}} key={user.id}>{user.name}</DropdownItem>))}

                    </DropdownButton>
                </Grid>
                <Typography variant="h3" gutterBottom>
                </Typography>
                <Grid container justify="center">
                    <form >
                        <FormGroup controlId="formBasicName" >
                            <FormControl autoComplete="on" value={this.state.name} onChange={this.onChangeName} type="text" placeholder="name" style={{ width: "370px" }} />
                        </FormGroup>
                        <FormGroup controlId="formBasicLastName" >
                            <FormControl autoComplete="on" value={this.state.lastname} onChange={this.onChangeLastname} type="text" placeholder="last name" style={{ width: "370px" }} />
                        </FormGroup>
                        <FormGroup controlId="formBasicEmail" >
                            <FormControl autoComplete="on" value={this.state.email} onChange={this.onChangeEmail} type="email" placeholder="Enter email" style={{ width: "370px" }} />
                        </FormGroup>
                        <FormGroup controlId="formBasicPassword" >
                            <FormControl autoComplete="on" value={this.state.password} onChange={this.onChangePassowrd} type="password" placeholder="Password" style={{ width: "370px" }} />
                        </FormGroup>
                        <FormControl value={this.state.role} onChange={this.onChangeRole} as='select' className='list-User' >
                        <option value='admin' > admin </option>
                        <option value='viewer'> viewer </option>
                        </FormControl>
                    </form>
                </Grid>
                

                <Grid container justify="center">
                    <div>
                        <Button onClick={this.registerUser} variant="contained" color="primary" className='create'>
                            Create
                        </Button>{'  '}

                        <Button onClick={this.deleteUser} variant="contained" color="primary" className='delete'>
                            Delete
                        </Button>{'  '}

                        <Button onClick={this.updateUser} variant="contained" color="primary" className='update'>
                            Update
                        </Button>{'  '}
                    </div>
                </Grid>
                <Back />
            </div>

        )
    }
}
export default AdminUsers