import { adaptMovieList, adaptReviewList } from './moviesDataAdapter';

describe('adaptMovieList', () => {
  it('should adapt movie list to the correct structure', () => {
    const genres = [
      {
        id: 1,
        name: 'Action'
      },
      {
        id: 2,
        name: 'Comedy'
      },
      {
        id: 3,
        name: 'Crime'
      },
      {
        id: 4,
        name: 'Family'
      }
    ];

    const nowPlayingMoviesFromResponse = [
      {
        genre_ids: [1, 3],
        id: 1,
        overview: 'Movie 1 overview',
        poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        release_date: '2024-07-24',
        title: 'Movie 1',
        vote_average: 7.977
      },
      {
        genre_ids: [2, 4],
        id: 2,
        overview: 'Movie 2 overview',
        poster_path: '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
        release_date: '2024-06-11',
        title: 'Movie 2',
        vote_average: 7.637
      }
    ];

    const adaptedMovieData = adaptMovieList(nowPlayingMoviesFromResponse, genres);

    expect(adaptedMovieData).toEqual([
      {
        id: 1,
        poster: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        title: 'Movie 1',
        releaseDate: '2024',
        genres: 'Action, Crime',
        voteAverage: 8,
        overview: 'Movie 1 overview'
      },

      {
        id: 2,
        poster: '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
        title: 'Movie 2',
        releaseDate: '2024',
        genres: 'Comedy, Family',
        voteAverage: 8,
        overview: 'Movie 2 overview'
      }
    ]);
  });

  it('should adapt movie reviews to the correct structure', () => {
    const movieReviewsFromResponse = [
      {
        content: 'Movie review 1 content',
        created_at: '2024-07-25T21:26:26.038Z',
        author_details: {
          username: 'Roger',
          rating: 7
        }
      },
      {
        content: 'Movie review 2 content',
        created_at: '2024-04-25T21:26:26.038Z',
        author_details: {
          username: 'David',
          rating: 8
        }
      },
      {
        content: 'Movie review 3 content',
        created_at: '2024-05-25T21:26:26.038Z',
        author_details: {
          username: 'Syd',
          rating: 10
        }
      }
    ];

    const adaptedMovieReviews = adaptReviewList(movieReviewsFromResponse);

    expect(adaptedMovieReviews).toEqual([
      {
        content: 'Movie review 1 content',
        createdAt: '26/07/2024',
        author: 'Roger',
        authorRating: 70
      },

      {
        content: 'Movie review 2 content',
        createdAt: '26/04/2024',
        author: 'David',
        authorRating: 80
      }
    ]);
  });
});
