import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Back from '../components/Back'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'
import { FormGroup, FormControl } from "react-bootstrap"
import Button from '@material-ui/core/Button'

class AdminUsers extends React.Component {
    state = { users: [] }

    componentDidMount = () => {
        var myHeaders = new Headers();
        myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg1MTk0MDcxLCJleHAiOjE1ODY0OTAwNzF9.L8yadq_H-tGZhb0OspvtksWX85FViGI-VqlFIQ5BrT4");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://iot-097c3751.localhost.run/api/users/", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.setState({ users: result.users })
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

            <div className="container" >
                <Grid container justify="center" >
                
                    <Box my={4}>
                        <Typography variant="h3"  gutterBottom>
                            Admin Users
                        </Typography>
                    </Box>
                
                </Grid>
                <Grid container justify="center" >
                    <DropdownButton id="dropdown-basic-button" title="Registered Users" className='list-User' >
                        {this.state.users.map((user,i) => {
                            console.log('hola')
                            //<DropdownItem as="button"> user.name </DropdownItem>
                        })}
                    </DropdownButton>
                </Grid>
                <Grid container justify="center">
                    <form>
                        <FormGroup controlId="formBasicName" >
                            <FormControl type="name" placeholder="full name" style={{ width: "370px" }} />
                        </FormGroup>
                        <FormGroup controlId="formBasicEmail" >
                            <FormControl type="email" placeholder="Enter email" style={{ width: "370px" }} />
                        </FormGroup>
                        <FormGroup controlId="formBasicPassword" >
                            <FormControl type="password" placeholder="Password" style={{ width: "370px" }} />
                        </FormGroup>
                    </form>
                </Grid>
                <Grid container justify="center">
                    <DropdownButton id="dropdown-basic-button" title="ROL" className='list-User' >
                        <DropdownItem as="button"> Admin </DropdownItem>
                        <DropdownItem as="button"> User </DropdownItem>
                    </DropdownButton>
                </Grid>
                <Grid container justify="center">
                    <div>
                        <Button variant="contained" color="primary" className='create'>
                            Create
                    </Button>{'  '}

                        <Button variant="contained" color="primary" className='delete'>
                            Delete
                    </Button>{'  '}

                        <Button variant="contained" color="primary" className='update'>
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