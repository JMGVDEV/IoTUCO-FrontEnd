import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { Redirect } from 'react-router-dom'

class TestQR extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result', temp:'', hum:'', bed:''
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
    

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://3.22.57.173:3000/api/grow_beds/"+this.state.result, requestOptions)
      .then(response => response.text())
      .then(result =>{ 
        let json = JSON.parse(result)
        this.setState({temp: json.growbed})
        console.log(json.growbed)
        console.log(json)})
        
      .catch(error => console.log('error', error));
  }
  

  render() {
    const previewStyle = {
      height: 480,
      width: 480,
    }
    if (!this.state.Qr) {
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
      return (<Redirect to={{pathname: '/growbedstatus', hum:this.state.hum, temp:this.state.temp, bed:this.state.bed }} ></Redirect>)
  }
  }
}


export default TestQR;