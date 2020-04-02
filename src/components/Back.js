import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const Back = () => (

    <Link to="/welcome">
        <IconButton color="primary" aria-label="upload picture" component="span">
            <ArrowBackRoundedIcon backgroundcolor = "primary" style={{ fontSize: 80 }}/>
        </IconButton>
    </Link>
)

export default Back