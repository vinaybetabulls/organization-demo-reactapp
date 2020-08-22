import React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Welcome to Organization
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footerPosition: {
        position: 'fixed',
        bottom: 0
      }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <Container className={classes.footerPosition}>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}