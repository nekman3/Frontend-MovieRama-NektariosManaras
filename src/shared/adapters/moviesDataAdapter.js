import { isNil } from '../../helpers/utils';
export const adaptMovieList = (data, genres) => {
  return data.map((movie) => {
    const { id, poster_path, release_date, title, vote_average, overview, genre_ids } = movie;

    return {
      id,
      poster: poster_path,
      title,
      releaseDate: release_date.slice(0, 4),
      genres: adaptGenreList(genre_ids, genres),
      voteAverage: Math.round(vote_average),
      overview
    };
  });
};

export const adaptGenreList = (ids, genres) => {
  const genresOfMovie = genres.filter((genre) => ids.indexOf(genre.id) !== -1);
  return genresOfMovie.map((genre) => (!isNil(genre.name) ? genre.name : null)).join(', ');
};

export const adaptReviewList = (data) => {
  let reviews = data;
  if (data.length > 2) {
    // display only two reviews if there are
    reviews = data.slice(0, 2);
  }
  return reviews.map((review) => {
    const { content, created_at, author_details } = review;
    return {
      content,
      createdAt: new Date(created_at).toLocaleDateString('en-GB'),
      author: author_details?.username,
      authorRating: !isNil(author_details?.rating) ? author_details?.rating * 10 : null
    };
  });
};

export const adaptMovieVideos = (data) => {
  if (data.length === 0) {
    return '';
  }
  const videoTeaser = data.find((video) => video.type === 'Teaser');
  return `https://www.youtube.com/embed/${videoTeaser?.key}`;
};

export const adaptSimilarMovies = (data) => {
  let similarList = data;
  if (similarList.length > 10) {
    // display the first 10 similar movies
    similarList = data.slice(0, 10);
  }
  return similarList.map((similar) => {
    const { poster_path } = similar;
    return {
      poster: poster_path
    };
  });
};
