import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const Back = () => (
 
                <Link to="/welcome">
                    <Button   variant="contained"  color = 'primary' style={{width: "100px"}}>
                            Back
                    </Button>
                </Link>
            )

export default Back