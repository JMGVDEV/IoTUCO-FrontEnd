import React from 'react'
import '../components/styles/StylesWelcome.css'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'
import LogOut from '../components/LogOut'


function Welcome(){
   
                  
            return (
             <div className = 'container'>
                <Grid container justify = "center">
                <Box my={4}>
                    <Typography align = 'center' variant = "h2" style={{color:'blue'}} gutterBottom>
                        Hello , how are you?
                    </Typography>
                    <Typography  variant = "h3" color="textSecondary" gutterBottom>
                        welcome to  this proyect!!
                    </Typography>
                </Box>
                 </Grid>
                <Grid container justify = "center">
                    <DropdownButton id = "dropdown-basic-button" title = "PAGES" >
                        <DropdownItem href = "/adminusers"> AdminUsers </DropdownItem>
                        <DropdownItem href = "/growbedstatus"> EstadoCama </DropdownItem>
                        <DropdownItem href = "/configactions"> ConfigurarAcciones </DropdownItem>
                        <DropdownItem href = "/dashboards"> Dashboards </DropdownItem>
                    </DropdownButton>
                </Grid> 
                <LogOut/>      
              </div>
            )
          
}   

export default Welcome