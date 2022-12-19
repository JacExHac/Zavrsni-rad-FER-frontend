import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const [errorWhileFetching, setErrorWhileFetching] = useState("");

  const navigate = useNavigate();


  const loginFunction = (e) => {
    e.preventDefault();

    const user = {username: username, password: password};

    if(role === "student") {

      //fetch data
      axios.post("http://localhost:8080/student/login", user)
      .then( (res) => {
        if(res.data.studentID !== undefined && res.data.studentID !== null) {
          //if everything is ok, do the login
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("studentID", JSON.stringify(res.data.studentID));
          localStorage.setItem("role", "student");
          navigate("/home");
          return;       
        } else {
          setError("Netočni podatci za prijavu");
          return;
        };
      }).catch( (err) => {
        setErrorWhileFetching(err.data);
      })

    }

    if(role === "voditelj-izlozbe") {

      //fetch data
      axios.post("http://localhost:8080/exhmanager/login", user)
      .then( (res) => {
        if(res.data.exhibitionManagerID !== undefined && res.data.exhibitionManagerID !== null) {
          //if everything is ok, do the login
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("exhibitionManagerID", JSON.stringify(res.data.exhibitionManagerID));
          localStorage.setItem("role", "exhibition-manager");
          navigate("/home");
          return;       
        } else {
          setError("Netočni podatci za prijavu");
          return;
        };
      }).catch( (err) => {
        setErrorWhileFetching(err.data);
      })

    }
    
    if(role === "stu-slu-clan") {

      //fetch data
      axios.post("http://localhost:8080/stuslu/login", user)
      .then( (res) => {
        if(res.data.stusluMemberID !== undefined && res.data.stusluMemberID !== null) {
          //if everything is ok, do the login
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("stusluMemberID", JSON.stringify(res.data.stusluMemberID));
          localStorage.setItem("role", "stu-slu-member");
          navigate("/home");
          return;       
        } else {
          setError("Netočni podatci za prijavu");
          return;
        };
      }).catch( (err) => {
        setErrorWhileFetching(err.data);
      })
    }

      if(role === "administrator") {

        //fetch data
        axios.post("http://localhost:8080/administrator/login", user)
        .then( (res) => {
          if(res.data.administratorID !== undefined && res.data.administratorID !== null) {
            //if everything is ok, do the login
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("administratorID", JSON.stringify(res.data.administratorID));
            localStorage.setItem("role", "administrator");
            navigate("/mainadmin");
            return;       
          } else {
            setError("Netočni podatci za prijavu");
            return;
          };
        }).catch( (err) => {
          setErrorWhileFetching(err.data);
        })

    }

  }
  

  return ( 
    <div className="login-form">
      <h2>Prijava na Dan doktorata:</h2>

      {(error !== "") ? (
        <div className="error-during-login">{error}</div>
      ) : ""}
      <form onSubmit={loginFunction}>
      
      <div className="username-group">
        <label htmlFor="username">Korisničko ime:</label>
        <input type="text" name="username" id="username" placeholder="korisničko ime" onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="password-group"> 
        <label htmlFor="password">Lozinka:</label>
        <input type="password" name="password" id="password" placeholder="******" onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className="authtype-radio">
        <p>Odaberite svoju ulogu:</p>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="voditelj-izlozbe">Voditelj izložbe</option>
          <option value="stu-slu-clan">Član studentske službe</option>
          <option value="administrator">Administrator</option>
        </select>
      </div>

      <button type="submit" className="login-btn">Prijavi se</button>
    </form>

    </div>


   );
}
 
export default Login;