import "../App.css";
import React,{Component} from 'react'
import Button from '../components/elements/Button';
import Particles from 'react-particles-js';
import axios from "axios";
import auth from '../Auth'
import Cookies from "js-cookie"
import DribbleButton from 'react-dribble-button';
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      password: null,
      formErrors: {
        firstName: "",
        password: ""
      },
      apiResponse:""
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if(formValid(this.state))
    {
    const username=this.state.firstName;
    const password=this.state.password;
    const url = "http://localhost:9000/users/staffs";
    let sendData = () => {
    axios.post(url, {username,password})
       .then(res => {
         console.log('Data send')
         Cookies.set('staffname',username);
         auth.login(()=>{
          this.props.history.push('/upload'); 
         })
        })
       .catch(err=>{
         if(err.response)
         {
          alert("Invalid username or password");
          this.props.history.push('/login1')
         }
       })
    }
    sendData();
  }
    else
    {
      alert("Fill the form properly");
    }
  };
  
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName1":
        formErrors.firstName =
          value.length < 3 ? "Invalid username" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 4 ? "Invalid password" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (

      <div className="wrapper">
        <div className="background">
            <Particles 
            params={{ 
              "particles":
              {
                "number":
                {
                  "value": 60,
                  "density": 
                  {
                    "enable": true,
                    "value_area": 1000
                  }
                },
                "color":
                {
                  "value": "#00bfff"
                },
                "shape":
                {
                  "type": "polygon",
                  "stroke":
                  {
                    "width":5,
                    "color": "#fff"
                  },
                  "polygon": 
                  {
                    "nb_sides": 1
                  }
                },
                "opacity":
                {
                  "value": 0.5,
                  "random": true
                },
                "size":
                {
                  "value": 1
                }
              },
              "interactivity":
              {
                "events":
                {
                  "onhover":
                  {
                    "enable":true,
                    "mode": "repulse"
                  },
                  "onclick":
                  {
                    "enable":true,
                    "mode": "push"
                  }
                },
                "modes":
                {
                  "repulse":
                  {
                    "distance": 50,
                    "duration": 0.5
                  },
                  "grab":
                  {
                    "distance": 100,
                    "line_linked": 
                    {
                      "opacity": 1
                    }
                  }
                }
              }
          }} 
        /> 
        </div>
        <div className="backbutton">
          <a href="/"><DribbleButton color="black"  animationDuration={1000}>Back</DribbleButton></a>
        </div>
        <div className="form-wrapper">

        <p>{this.state.apiResponse}</p>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">Username</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder=""
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder=""
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
              <br />
            </div>
            <div className="createAccount">
              <Button color="primary" onClick={this.handleSubmit} type="submit">Log In</Button>
              <br></br>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;