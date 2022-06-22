import { gql, useQuery } from "@apollo/client";
import React from "react";

import "./MovieList.css";

const GET_MOVIES = gql`
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

export default function MovieList() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1 className="CategoryTitle">Trending Now</h1>
      <div className="MovieList">
        {data.movies.map(({ id, title, released, poster }, i) => {
          return (
            <div key={i} className="Movie">
              <img src={poster} alt="Movie Poster" />
              <h2>{title}</h2>
              <p>Came out in {released}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
