import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Header from './components/Header/Header';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    height: '100%',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.mainContent}>
        <Container className={classes.container} maxWidth='md'>
          {children!}
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography
          variant='subtitle1'
          align='center'
          color='textSecondary'
          component='p'
        >
          MMM = Movies! Movies! Movies!
        </Typography>
      </footer>
    </div>
  );
};

export default MainLayout;
