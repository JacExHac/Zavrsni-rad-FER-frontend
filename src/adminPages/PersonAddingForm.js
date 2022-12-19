import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonAddingForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [jmbag, setJmbag] = useState("");
  const [role, setRole] = useState("student");

  const [errorDuringFormEnteringMessage, setErrorDuringFormEnteringMessage] = useState("");
  const [errorAfterRequest, setErrorAfterRequest] = useState("");

  let arePasswordSame = true;

  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();


    if(password !== repeatedPassword || errorDuringFormEnteringMessage !== "") {
      arePasswordSame = false;
    }

    if(password === repeatedPassword) {
      arePasswordSame = true;
    }

    if(!arePasswordSame) {
      setErrorDuringFormEnteringMessage("Niste dobro ponovili šifru");
      return;
    }

    let personTBA = {
      role : role,
      username : username,
      name : name,
      surname : surname,
      password : password,
    }

    console.log(personTBA);

    if(role==="student") {
      personTBA.jmbag = jmbag;
    }

    axios.post("http://localhost:8080/administrator/addperson", personTBA)
    .then((res) => {
      console.log(res);

      if(res.data.errorMessage) {
        console.log("Doslo je do problema");
        setErrorDuringFormEnteringMessage("");
        setErrorAfterRequest(res.data.errorMessage)
      } 

      if(res.data.errorMessage === null) {
        navigate("/mainadmin");
      }
    } )

  }

  return ( 
    <div className="form-container">
      <h2>Uz pomoć ovog obrasca stvorite nove entitete u bazi podatka!</h2>

      <div className="error-div">
      {errorDuringFormEnteringMessage !== "" ? 
        <p>{errorDuringFormEnteringMessage}</p>
      :
       <></>}
       {errorAfterRequest !== "" ?
       <p>{errorAfterRequest}</p>
      :
      <></>}
      </div>
      

      <form onSubmit={handleSubmit}>

        <div className="persontype">
          <p>Choose person role</p>

          <select value={role} onChange = { (e) => setRole(e.target.value) }>
            <option value="student">Student</option>
            <option value="exhibition-manager">Voditelj izložbe</option>
            <option value="stu-slu-member">Član studentske službe</option>
          </select>

        </div>

        <div className="username-field">
          <p>Unesite korisničko ime za korisnika</p>
          <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="password-field">
          <p>Unesite šifru za korisnika</p>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="password-field">
          <p>Ponovite šifru za korisnika</p>
          <input type="password" id="passwordrepeated" name="passwordrepeated" required onChange={(e) => setRepeatedPassword(e.target.value)} />
        </div>

        <div className="name-field">
          <p>Unesite korisnikovo ime</p>
          <input type="texst" id="name" name="name"  onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="surname-field">
        <p>Unesite korisnikovo prezime</p>
          <input type="text" id="surname" name="surname"  onChange={(e) => setSurname(e.target.value)} />
        </div>

        {role === "student" ? 
          <div className="jmbag-field">
            <p>Unesite jmbag</p>
            <input type="text" id="jmbag" name="jmbag" required maxLength="10" onChange={(e) => setJmbag(e.target.value)} />
          </div> 
        :
          <></>
        }
        <button type="submit">STVORI</button>

      </form>
    </div>
   );
}
 
export default PersonAddingForm;