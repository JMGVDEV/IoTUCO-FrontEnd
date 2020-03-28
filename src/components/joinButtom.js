import React from 'react'
//import './styles/stylesAddButton.css'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';




const JoinButton = () => (
 
                <Link to="/main/welcome">
                    <Button type="submit" className="center aligned" variant="contained" fullWidth color = 'primary' style={{width: "370px"}}  >
                            LOGIN
                    </Button>
                </Link>
            )

export default JoinButton