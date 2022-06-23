import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_MOVIE, GET_MOVIES } from "../queries";

export default function AddMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [addMovie, { loading, error }] = useMutation(ADD_MOVIE, {
    variables: {
      title: movie.title,
      released: movie.released,
      rating: parseInt(movie.released),
      // TODO: split string into an array of strings
      genre: movie.genre,
      description: movie.description,
      duration: parseInt(movie.duration),
      poster: movie.poster,
    },
    onError: (error) => alert("An Error Happened: ", error),
    updateQueries: [
      {
        query: GET_MOVIES,
      },
    ],
  });

  const handleChange = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;
    setMovie((values) => ({ ...values, [inputName]: value }));
  };

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
