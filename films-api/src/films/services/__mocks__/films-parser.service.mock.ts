export const filmsFileContentMock = `Title: Blazing Saddles
Release Year: 1974
Format: VHS
Stars: Mel Brooks, Clevon Little

Title: Casablanca
Release Year: 1942
Format: DVD
Stars: Humphrey Bogart, Ingrid Bergman`;

// Second film doesn`t contain Format field
export const filmWithMissingFieldFileMock = `Title: Blazing Saddles
Release Year: 1974
Format: VHS
Stars: Mel Brooks, Clevon Little

Title: Casablanca
Release Year: 1942
Stars: Humphrey Bogart, Ingrid Bergman`;

// Second film`s Format field has incorrect value
export const wrongFieldValueFileMock = `Title: Blazing Saddles
Release Year: 1974
Format: VHS
Stars: Mel Brooks, Clevon Little

Title: Casablanca
Release Year: 1942
Format: WRONG
Stars: Humphrey Bogart, Ingrid Bergman`;

export const filmsParsingResult = [
  {
    title: 'Blazing Saddles',
    releaseYear: 1974,
    format: 'VHS',
    stars: [
      {
        firstName: 'Mel',
        lastName: 'Brooks',
      },
      {
        firstName: 'Clevon',
        lastName: 'Little',
      },
    ],
  },
  {
    title: 'Casablanca',
    releaseYear: 1942,
    format: 'DVD',
    stars: [
      {
        firstName: 'Humphrey',
        lastName: 'Bogart',
      },
      {
        firstName: 'Ingrid',
        lastName: 'Bergman',
      },
    ],
  },
];
