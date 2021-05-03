import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_HOST } from '../../constants/api';
import { Film, FilmDetails as FilmsDetailsData } from '../../models/Film';
import FilmDetails from './FilmDetails/FilmDetails';
import { CircularProgress, Container, makeStyles } from '@material-ui/core';
import CenteredLoader from '../CenteredLoader/CenteredLoader';

const PageFilmDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [filmDetails, setFilms] = useState<FilmsDetailsData>();

  useEffect(() => {
    axios
      .get(`${API_HOST}/films/${id}`)
      .then(res => setTimeout(() => setFilms(res.data), 500));
  }, []);

  return (
    <>{filmDetails ? <FilmDetails {...filmDetails} /> : <CenteredLoader />}</>
  );
};

export default PageFilmDetails;
