import { useQuery } from "@apollo/client";
import React from "react";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { GET_MOVIES } from "../queries";

export default function MovieList() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading)
    return (
      <ContentLoader
        speed={0.5}
        width={900}
        height={663}
        viewBox="0 0 900 663"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="44" y="38" rx="3" ry="3" width="190" height="44" />
        <rect x="42" y="138" rx="0" ry="0" width="218" height="190" />
        <rect x="303" y="146" rx="0" ry="0" width="210" height="185" />
        <rect x="568" y="149" rx="0" ry="0" width="210" height="185" />
        <rect x="42" y="358" rx="0" ry="0" width="210" height="180" />
        <rect x="303" y="146" rx="0" ry="0" width="210" height="185" />
        <rect x="45" y="382" rx="0" ry="0" width="218" height="192" />
        <rect x="310" y="382" rx="0" ry="0" width="216" height="195" />
        <rect x="569" y="378" rx="0" ry="0" width="210" height="203" />
      </ContentLoader>
    );
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
