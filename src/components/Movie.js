import React from "react";
import { gql, useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import ContentLoader from "react-content-loader";

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

  if (loading)
    return (
      <ContentLoader
        speed={0.5}
        width={1024}
        height={663}
        viewBox="0 0 1024 663"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="525" y="116" rx="0" ry="0" width="219" height="24" />
        <rect x="42" y="118" rx="0" ry="0" width="384" height="469" />
        <rect x="528" y="168" rx="0" ry="0" width="265" height="116" />
        <rect x="533" y="302" rx="0" ry="0" width="254" height="9" />
        <rect x="538" y="321" rx="0" ry="0" width="215" height="9" />
        <rect x="536" y="341" rx="0" ry="0" width="247" height="14" />
        <rect x="538" y="369" rx="0" ry="0" width="267" height="11" />
      </ContentLoader>
    );
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
