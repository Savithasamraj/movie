import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Usercontext from "./Usercontext";
function User() {
  
const usercontextdata=useContext(Usercontext)
  let formik = useFormik({
    initialValues: {
      count: 0
    },
    onSubmit: (values) => {
      console.log(values);
     
    },
  });
  let fetchData = async () => {
    try {
      let res = await axios.get("https://server-hack.herokuapp.com/dashboard", {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      });
      setMovies(res.data);

      // console.log(movies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-danger text-center"> Movie List </h1>
          </div>
          <form className="d-flex flex-nowrap" onSubmit={formik.handleSubmit}>
            <div className="mb-3 col-lg-2">
              <label for="ticket-count" className="form-label">
                Enter Ticket count
              </label>
              <input
                className="form-control"
                name="count"
                value={formik.values.count}
                onChange={formik.handleChange}
                id="ticket-count"
              />
            </div>

            <button type="submit" className="btn btn-danger m-0 p-0 ">
              Submit
            </button>
          </form>
          {/* <div className="row m-5">
            {Movies.map((movie) => {
              return (
                <div className="col">
                  <div class="card" style={{ width: "18rem" }}>
                    <img
                      src={`${movie.img}`}
                      class="card-img-top img-thumbnail"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">{movie.title}</h5>
                      <p class="card-text">{movie.text}</p>
                      <button
                        onClick={() => sendTitle(`${movie.title}`)}
                        class="btn btn-danger"
                      >
                        Book Tickets
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default  User;


