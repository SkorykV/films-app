import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_HOST } from '../../../constants/api';
import { FilmDetails as FilmsDetailsData } from '../../../models/Film';
import FilmDetails from './FilmDetails/FilmDetails';
import CenteredLoader from '../../CenteredLoader/CenteredLoader';

const PageFilmDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();
  const [filmDetails, setFilms] = useState<FilmsDetailsData>();

  useEffect(() => {
    axios
      .get(`${API_HOST}/films/${id}`)
      .then(res => setFilms(res.data))
      .catch(e => history.push('/404'));
  }, [id, history]);

  return (
    <>{filmDetails ? <FilmDetails {...filmDetails} /> : <CenteredLoader />}</>
  );
};

export default PageFilmDetails;
