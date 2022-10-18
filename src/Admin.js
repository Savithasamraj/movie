import React,{useContext} from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./Component.css"
function Login() {

  const navigate = useNavigate();
  
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "username is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit:async (values) => {
      try {
        const login = await axios.post("https://serverr1234.herokuapp.com/", values);
        localStorage.setItem("react_app_token", login.data.token);
        
    
      
        alert(` Hello  ${values.username}  
                  ${login.data.message}`);
                  if(login.data.message=== "Welcome to Query Ticket Raising Portal"){
                    navigate("/adminportal")
                    
                  }
                      
       
       
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
    <nav class="navbar navbar-light bg-dark">
  <div className="bookhead">
    Book My Show
  </div>
 
</nav>
      <div className="body">
       
       
        <div className="container">
          <div className="col-4">
            <div className="row">
              
              <form
                className="form"
                id="loginform"
                onSubmit={formik.handleSubmit}
              >
               
                
                <div class="mb-3">
                  <label for="username" class="form-label">
                    <img
                      className="logimage"
                      src="https://cdn-icons-png.flaticon.com/512/4743/4743186.png"
                    ></img>{" "}
                    UserName
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter Adminname"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    
                  />
                  {formik.errors.username ? (
                <span className="errors">{formik.errors.username}</span>
              ) : null}
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    <img
                      className="logimage"
                      src="https://cdn-icons-png.flaticon.com/512/2889/2889676.png"
                    ></img>
                    Password
                  </label>
                  <input
                    type="password"
                    
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    placeholder="Enter password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  
                  />
                  {formik.errors.password ? (
                <span className="errors">{formik.errors.password}</span>
              ) : null}
                 
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <div className="sub" >
                  *only admins are allowed
                </div>

                
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
