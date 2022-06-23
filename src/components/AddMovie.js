import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ADD_MOVIE = gql`
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
export default function AddMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [addMovie, { loading, error }] = useMutation(ADD_MOVIE, {
    variables: {
      title: movie.title,
      released: movie.released,
      rating: parseInt(movie.released),
      genre: [movie.genre],
      //   genre: movie.genre.split(","),
      description: movie.description,
      duration: parseInt(movie.duration),
      poster: movie.poster,
    },
  });

  const handleChange = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;
    setMovie((values) => ({ ...values, [inputName]: value }));
  };

  if (loading) console.log("Submitting");
  if (error) console.log("Something Wrong Happened");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await addMovie();
        setMovie({});
        navigate("/");
      }}
      className="MovieForm"
    >
      <h2>Movie Form</h2>
      <label>Title</label>
      <input
        type="text"
        name="title"
        required
        value={movie.title || ""}
        onChange={handleChange}
      />
      <label>Description</label>
      <input
        type="text"
        name="description"
        required
        value={movie.description || ""}
        onChange={handleChange}
      />
      <label>Realeased</label>
      <input
        type="number"
        name="released"
        required
        value={movie.released || ""}
        onChange={handleChange}
      />
      <label>Rating</label>
      <input
        type="number"
        name="rating"
        required
        value={movie.rating || ""}
        onChange={handleChange}
      />
      <label>Duration</label>
      <input
        type="number"
        name="duration"
        value={movie.duration || ""}
        onChange={handleChange}
      />
      <label>Poster</label>
      <input
        type="url"
        name="poster"
        required
        value={movie.poster || ""}
        onChange={handleChange}
      />
      <label>Genre</label>
      <input
        type="text"
        name="genre"
        value={movie.genre || ""}
        onChange={handleChange}
      />
      <input type="submit" disabled={loading} />
    </form>
  );
}
