import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Usercontext from "./Usercontext";

function Adminportal() {
  const usercontextdata = useContext(Usercontext);
  //  const [usercontextdata.Movies, setusercontextdata.Movies] = useState([]);
  //   const[edit,setedit]=useState({})
  //   const[usercontextdata.subedit,setusercontextdata.subedit]=useState(false)
  let fetchData = async () => {
    try {
      let res = await axios.get("https://serverr1234.herokuapp.com/admin", {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      });
      usercontextdata.setMovies([res.data]);
      console.log(usercontextdata.Movies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      img: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      usercontextdata.setMovies([...usercontextdata.Movies, values]);
      console.log(usercontextdata.Movies);

      if (!usercontextdata.subedit) {
        try {
          const register = await axios.post(
            "https://serverr1234.herokuapp.com/admin",
            values,
            {
              headers: {
                Authorization: `${localStorage.getItem("react_app_token")}`,
              },
            }
          );
          alert(register.data.message);

          // fetchData();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          delete values._id;
          await axios.put(
            `https://serverr1234.herokuapp.com/admin/${usercontextdata.edit._id}`,
            values,
            {
              headers: {
                Authorization: `${localStorage.getItem("react_app_token")}`,
              },
            }
          );
          usercontextdata.subedit(false);
          fetchData();
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const handleEdit = async (id) => {
    console.log(id);
    try {
      await axios.post(`https://serverr1234.herokuapp.com/admin/${id}`);
      formik.setValues(usercontextdata.Movies.data);
      usercontextdata.setedit(usercontextdata.Movies.data);
      usercontextdata.subedit(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
  
    try {
      await axios.delete(
        `https://serverr1234.herokuapp.com/ admin/${id}`
      );

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h2> Movie details </h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={formik.handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  enter the Movie Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  about movie
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="details"
                  onChange={formik.handleChange}
                  value={formik.values.details}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="img"
                  onChange={formik.handleChange}
                  value={formik.values.img}
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
            <div className="row">
              <div className="col mt-4">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Image URL</th>
                      <th scope="col"> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usercontextdata.Movies.map((movie) => {
                      return (
                        <tr>
                          <td>{movie.name}</td>
                          <td>{movie.details}</td>
                          <td>{movie.img}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEdit(movie._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(movie._id)}
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
        </div>
      </div>
    </>
  );
}

export default Adminportal;
