// code from mosh hamedani tutorial
// import React, { Component, useEffect, useState } from "react";
// import NavBar from "./components/navbar";
// class App extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <NavBar />
//       </React.Fragment>
//     );
//   }
// }

// code from express React connecting tutorial
// import { useEffect, useState } from "react";
// function App() {
//   const [backendData, setBackendData] = useState([{}]);
//   useEffect(() => {
//     fetch("/api")
//       .then((response) => response.json())
//       .then((data) => {
//         setBackendData(data);
//       });
//   }, []);
//   return (
//     <div>
//       {typeof backendData.users === "undefined" ? (
//         <p> Loading ...</p>
//       ) : (
//         backendData.users.map((user, i) => <p key={i}> {user} </p>)
//       )}
//     </div>
//   );
// }

//code from CRUD MySQL React Express tutorial
import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios"; //helps make requests

function App() {
  const [movieName, setMovieName] = useState();
  const [movieReview, setMovieReview] = useState();
  const [editMovieReview, setEditMovieReview] = useState();
  const [movieReviewsList, setMovieReviewsList] = useState([{}]);
  const submitReview = () => {
    Axios.post("http://localhost:5000/api/insert", {
      movieName: movieName,
      movieReview: movieReview,
    }).then(() => {
      alert("succesful insert");
    });
    // to clear input boxes
    const inputs = document.querySelectorAll("#review, #movieName");

    inputs.forEach((input) => {
      input.value = "";
    });
  };
  const updateMovieReview = (id) => {
    Axios.put("http://localhost:5000/api/update", {
      movieReview: editMovieReview,
      id: id,
    }).then((response) => {
      setMovieReviewsList(
        movieReviewsList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                movieReview: val.movieReview,
              }
            : val;
        })
      );
    });
    //to clear editReview box
    const editInputBox = document.getElementById("editReview");
    editInputBox.value = "";
  };

  const deleteMovieReview = (id) => {
    Axios.delete(`http://localhost:5000/api/delete/${id}`).then((response) => {
      setMovieReviewsList(
        movieReviewsList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").then((response) =>
      setMovieReviewsList(response.data)
    );
  });
  return (
    <div className="App container">
      <h1> CRUD APPLICATION </h1>
      <div className="row">
        <div className="form col-3">
          <label> Movie Name </label>
          <input
            type="text"
            name="movieName"
            id="movieName"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
          <label> Review</label>
          <input
            type="text"
            name="review"
            id="review"
            onChange={(e) => {
              setMovieReview(e.target.value);
            }}
          />
          <button
            id="btn"
            class="btn btn-primary"
            onClick={submitReview}
            type="submit"
          >
            Submit
          </button>
          <hr></hr>
          <label>Edit Review</label>
          <input
            type="text"
            name="editReview"
            id="editReview"
            onChange={(e) => {
              setEditMovieReview(e.target.value);
            }}
          />
        </div>
        <div className="MovieReviewsList col-9">
          <table className="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Movie Name</th>
                <th scope="col">Movie Review</th>
              </tr>
            </thead>
            <tbody>
              {movieReviewsList.map((val) => {
                return (
                  <tr>
                    <td>{val.id}</td> <td>{val.movieName}</td>
                    <td>{val.movieReview}</td>
                    <td>
                      <button
                        id={val.id}
                        class="btn btn-warning"
                        onClick={() => {
                          updateMovieReview(val.id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        id={val.id}
                        class="btn btn-danger"
                        onClick={() => {
                          deleteMovieReview(val.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;
