import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const LogOut = () => (
 
                <Link to="/">
                    <Button onClick={() => localStorage.clear()} type="submit" className="left" variant="contained" fullWidth color = 'primary' style={{width: "100px"}}  >
                            LOG OUT
                    </Button>
                </Link>
            )

export default LogOut