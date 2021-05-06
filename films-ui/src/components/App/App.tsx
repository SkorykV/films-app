import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import SimpleNotification from '../Notification/Notification';
import PageAddFilm from '../pages/PageAddFilm/PageAddFilm';
import PageFilmDetails from '../pages/PageFilmDetails/PageFilmDetails';
import PageFilms from '../pages/PageFilms/PageFilms';
import PageImportFilms from '../pages/PageImportFilms/PageImportFilms';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

function App() {
  const [notification, setNotification] = useState<string | null>(null);

  const handleNotificationClose = useCallback(() => {
    setNotification(null);
  }, []);

  const handleNotificationAdd = useCallback((message: string) => {
    setNotification(message);
  }, []);

  return (
    <>
      {notification && (
        <SimpleNotification
          message={notification}
          onClose={handleNotificationClose}
        />
      )}
      <Router>
        <MainLayout>
          <Switch>
            <Route exact path='/'>
              <PageFilms onNotificationAdd={handleNotificationAdd} />
            </Route>
            <Route exact path='/add-film'>
              <PageAddFilm />
            </Route>
            <Route exact path={['/films/:id(\\d+)']}>
              <PageFilmDetails onNotificationAdd={handleNotificationAdd} />
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
    </>
  );
}

export default App;
