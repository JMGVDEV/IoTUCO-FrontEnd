import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

class Back extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:''
        }

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
                this.setState({name: data.name});
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

    }
   render(){ 
    return(
        
            <Link to={{pathname: '/welcome', name:this.state.name }}>
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <ArrowBackRoundedIcon backgroundcolor = "primary" style={{ fontSize: 80 }}/>
                </IconButton>
            </Link>

    )
    }
    }

export default Back