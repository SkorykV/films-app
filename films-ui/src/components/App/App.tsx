import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import PageAddFilm from '../pages/PageAddFilm/PageAddFilm';
import PageFilmDetails from '../pages/PageFilmDetails/PageFilmDetails';
import PageFilms from '../pages/PageFilms/PageFilms';
import PageImportFilms from '../pages/PageImportFilms/PageImportFilms';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
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
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
