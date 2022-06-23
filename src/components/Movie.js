import React from "react";
import { gql, useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query GetMovie($movieId: ID!) {
    movie(id: $movieId) {
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

export default function Movie() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { movieId: id },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error in the query</h1>;
  const {
    title,
    released,
    rating,
    genre,
    description,
    duration,
    poster,
  } = data.movie;
  return (
    <div className="MoviePageWrapper">
      <img src={poster} className="BigPoster" alt="Movie Poster" />
      <div className="MovieInfo">
        <p>Came out in {released}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>IMDB Rating: {rating}</p>
        {/* Make Genre a list */}
        <p>Genre: {genre.toString()}</p>
        <p>Playtime: {duration} minutes</p>
      </div>
    </div>
  );
}
