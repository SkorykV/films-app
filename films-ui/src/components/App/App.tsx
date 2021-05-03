import { makeStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import PageAddFilm from '../PageAddFilm/PageAddFilm';
import PageFilmDetails from '../PageFilmDetails/PageFilmDetails';
import PageFilms from '../PageFilms/PageFilms';
import PageImportFilms from '../PageImportFilms/PageImportFilms';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <MainLayout>
            <Route exact path='/'>
              <PageFilms />
            </Route>
            <Route exact path='/add-film'>
              <PageAddFilm />
            </Route>
            <Route exact path={['/films/:id(\\d+)']}>
              <PageFilmDetails />
            </Route>

            <Route exact path='/import-films'>
              <PageImportFilms />
            </Route>
            {/* <Route exact path='/admin/order/:id'>
              <PageOrder />
            </Route>
            <Route exact path='/admin/products'>
              <PageProductImport />
            </Route> */}
          </MainLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
