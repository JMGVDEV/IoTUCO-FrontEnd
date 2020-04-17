import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { Redirect } from 'react-router-dom'

class TestQR extends Component {

  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(result) {
    if (result) {
      this.setState({ result })
    }
  }
  handleError(err) {
    console.error(err)
  }

  BackUpload() {
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem('token'));
    console.log(this.state.result)
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://3.22.57.173:3000/api/grow_beds/" + this.state.result, requestOptions)
      .then(function (response) {
        console.log('response.body =', response.body);
        console.log('response.bodyUsed =', response.bodyUsed);
        console.log('response.headers =', response.headers);
        console.log('response.ok =', response.ok);
        console.log('response.status =', response.status);
        console.log('response.statusText =', response.statusText);
        console.log('response.type =', response.type);
        console.log('response.url =', response.url);
        return response.json();
      })
      .then(result => {
        var validate = result.ok;
        if (validate === true) {
          console.log('Es válido')
          this.setState({ redirect: "/growbedstatus" });
        }
      })

      .catch(error => console.log('error', error));


  }

  state = { redirect: null };
  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }


    const previewStyle = {
      height: 480,
      width: 480,
    }

    if (!this.state.login) {
    return (

      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p>{this.state.result}</p>
        <p>{this.BackUpload()}</p>
      </div>
    )
  }

  else {
      return (<Redirect to={{pathname: '/growbedstatus', result:this.state.result }} ></Redirect>)
  }
  }
}


export default TestQR;
