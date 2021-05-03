import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Theme,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  homeLink: {
    color: 'white',
    textDecoration: 'none',
  },
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'white',
  },
}));

const navLinks = [
  { title: 'add film', path: '/add-film' },
  { title: 'import films', path: '/import-films' },
];

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Container maxWidth='md' className={classes.navbarDisplayFlex}>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.homeLink} to='/'>
              MovieLand!
            </Link>
          </Typography>
          <List
            component='nav'
            aria-labelledby='main navigation'
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <ListItem component={Link} to={path} className={classes.linkText}>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </ListItem>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
