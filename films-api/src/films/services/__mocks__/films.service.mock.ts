export const filmActorsMock = [
  {
    firstName: 'name1',
    lastName: 'lastName1',
  },
  {
    firstName: 'name2',
    lastName: 'lastName2',
  },
];

export const createFilmDtoMock: any = {
  title: 'test',
  format: 'DVD',
  releaseYear: 2020,
  stars: filmActorsMock,
};

export const createManyFilmsMock: any = [
  createFilmDtoMock,
  {
    title: 'test2',
    format: 'DVD',
    releaseYear: 2020,
    stars: [
      {
        firstName: 'name3',
        lastName: 'lastName3',
      },
    ],
  },
  {
    title: 'test3',
    format: 'DVD',
    releaseYear: 2020,
    stars: [
      {
        firstName: 'name2',
        lastName: 'lastName2',
      },
      {
        firstName: 'name4',
        lastName: 'lastName4',
      },
    ],
  },
];
