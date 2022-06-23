import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      released
      rating
      genre
      description
      duration
      poster
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String
    $released: String
    $rating: Int
    $genre: [String]
    $description: String
    $duration: Int
    $poster: String
  ) {
    postMovie(
      title: $title
      released: $released
      rating: $rating
      genre: $genre
      description: $description
      duration: $duration
      poster: $poster
    ) {
      id
      title
      released
      genre
      rating
      description
      duration
      poster
    }
  }
`;
