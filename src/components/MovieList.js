import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

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
            <Link to={`/movies/${id}`} key={i} className="Movie">
              <img src={poster} className="MoviePoster" alt="Movie Poster" />
              <p className="MovieTitle">{title}</p>
              <p>Came out in {released}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
