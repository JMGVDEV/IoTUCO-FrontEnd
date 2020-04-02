import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Back from '../components/Back'
import Grid from '@material-ui/core/Grid'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import '../components/styles/StylesWelcome.css'




class ConfigActions extends React.Component {
    handleDateChange = (date) => {
        
    }

    render() {

        return (
            // <div style={{ backgroundColor: 'rgb(195, 199, 211)'}}>
            <div className="container"  >
                <Box my={1} alignItems="center" justifyContent="center" >
                    <Typography align='center' variant="h2" style={{ color: 'gray' }} gutterBottom>
                        Configure Actions
                        </Typography>
                </Box>
                <Grid container justify="center" >
                    <Box my={2} className='avatar' alignItems="center" justifyContent="center" >
                        <SettingsApplicationsOutlinedIcon style={{ fontSize: 80 }} />
                    </Box>
                </Grid>
                <Grid container justify="center"  >
                    <DropdownButton id="dropdown-basic-button" title="CAMAS">
                        <Dropdown.Item as="button"> CAMA 1 </Dropdown.Item>
                        <Dropdown.Item as="button"> CAMA 2 </Dropdown.Item>
                        <Dropdown.Item as="button"> CAMA 3 </Dropdown.Item>
                        <Dropdown.Item as="button"> CAMA 4 </Dropdown.Item>
                        <Dropdown.Item as="button"> CAMA 5 </Dropdown.Item>
                        <Dropdown.Item as="button"> CAMA 6 </Dropdown.Item>
                    </DropdownButton>
                </Grid>
                <div style={{ padding: 50 }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <Grid container justify="space-around" >
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Start Time"
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Final Time"
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div style={{ padding: 30 }}>
                    <Grid container justify="center"  >
                        <Button variant="contained" color="primary" className='create'>
                            CONFIGURAR
                </Button>
                    </Grid>
                </div>

                <Grid container justify="center" >
                    <div class="btn-group" role="group">
                        <DropdownButton id="dropdown-basic-button" title="INVERNADERO">
                            <Dropdown.Item as="button"> CAMA 1 </Dropdown.Item>
                            <Dropdown.Item as="button"> CAMA 2 </Dropdown.Item>
                            <Dropdown.Item as="button"> CAMA 3 </Dropdown.Item>
                            <Dropdown.Item as="button"> CAMA 4 </Dropdown.Item>
                            <Dropdown.Item as="button"> CAMA 5 </Dropdown.Item>
                            <Dropdown.Item as="button"> CAMA 6 </Dropdown.Item>
                        </DropdownButton>{''}
                        <Button></Button>{''}
                        <Button variant="contained" color="primary" className='create'>
                            ABRIR CORTINAS
                    </Button>{''}
                    </div>
                </Grid>

                <Back />
            </div>
            //</div>
        )

    }
}
export default ConfigActions
