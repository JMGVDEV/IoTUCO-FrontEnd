import React from 'react'
import { FormGroup, FormControl, FormText, FormCheck, } from "react-bootstrap";
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import '../components/styles/StylesWelcome.css'
import Grid from '@material-ui/core/Grid'
import { Redirect } from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button'

class LoginPage extends React.Component {

    state = { email: '', password: '' }
    onChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onChangePass = (event) => {
        this.setState({ password: event.target.value })
    }

    Upload = () => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", this.state.email);
        urlencoded.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        console.log(requestOptions.body)
        fetch("http://3.22.57.173:3000/api/login", requestOptions)
            //.then(response => response.text())
            .then(function (response) {
                console.log('response.body =', response.body);
                console.log('response.bodyUsed =', response.bodyUsed);
                console.log('response.headers =', response.headers);
                console.log('response.ok =', response.ok);
                console.log('response.status =', response.status);
                console.log('response.statusText =', response.statusText);
                console.log('response.type =', response.type);
                console.log('response.url =', response.url);
                if (!response.ok) {
                    throw new Error('Your user or password is wrong, please try again!');
                }
                return response.json();
            })


            .then(data => {
                console.log('data=', data);
                var token;
                token = data.jwt;
                console.log('Token=', token);
                localStorage.setItem('token', token);
                console.log(localStorage.getItem('token'));

                if (data.ok === true) {
                    this.setState({ login: true })
                }

            })


            .catch(error => console.log('error', error))
            .then(result => {
                console.log(result.ok)
                console.log(result)
                if (result.ok === true) {
                    this.setState({ login: true })
                }
            })
            .catch(error => console.log('error', error))
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {


        if (!this.state.login) {
            return (

                <div className="container" >
                   
                        <Box my={1}>
                            <Typography variant="h2" style={{color:'green'}} align="center">
                                Green House IoT
                        </Typography>
                        </Box>
                        <Grid container justify="center">   
                        <Box my={2} className='avatar' alignItems="center" justifyContent="center" >
                            <LockIcon style={{ fontSize: 60 }} />
                        </Box>
                        
                    </Grid>
                    <Grid container justify="center">
                        <form>

                            <FormGroup controlId="formBasicEmail" >
                                <FormControl value={this.state.email} onChange={this.onChange} type="email" placeholder="Enter email" style={{ width: "370px" }} />
                                <FormText className="text-muted">
                                    We'll never share your email with anyone else.
                            </FormText>
                            </FormGroup>
                            <FormGroup controlId="formBasicPassword" >
                                <FormControl value={this.state.password} onChange={this.onChangePass} type="password" placeholder="Password" style={{ width: "370px" }} />
                            </FormGroup>
                            <FormGroup controlId="formBasicCheckbox">
                                <FormCheck type="checkbox" label="Check me out" />
                            </FormGroup>

                            <Button onClick={this.Upload} variant='contained' color='primary' style={{ width: "370px" }} >Entrar</Button>
                        </form>
                    </Grid>
                </div>

            )
        }

        else {
            return (<Redirect to="/welcome"></Redirect>)
        }
    }
}


export default LoginPage