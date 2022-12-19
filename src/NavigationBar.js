
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {

  const [studentID, setStudentID] = useState("");
  const [lokalnoSpremiste, setLocalStorage] = useState(localStorage);

  const navigate = useNavigate();

  useEffect(()=>{
    console.log(lokalnoSpremiste);
    setStudentID(localStorage.getItem("studentID"));
  },[lokalnoSpremiste])


  const LogoutFunction = () => {
    localStorage.removeItem("studentID");
    localStorage.removeItem("exhibitionManagerID");
    localStorage.removeItem("administratorID");
    localStorage.removeItem("stusluMemberID");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role"); 
    console.log("Kliknut sam");
    navigate("/");
  } 


  if(localStorage.role === "administrator") {

    return(
      <nav className="navbar">
        <h1>Dan doktorata</h1>

        <div className="nav-links">
          <Link to="/mainadmin">Naslovna stranica</Link>
          <button className='logout-button' onClick={LogoutFunction}>Odjavi se</button>
        </div>

      </nav>
    );
  }

  if(localStorage.role === "student") {

    return(
      <nav className="navbar">
        <h1>Dan doktorata</h1>

        <div className="nav-links">
          <Link to="/home">Naslovna stranica</Link>
          <Link to={"/mydata/" + studentID}>Moji podatci</Link>
          <button onClick={LogoutFunction}>Odjavi se</button>
        </div>

      </nav>
    );
  }

  if(localStorage.role === "stu-slu-member") {

    return(
      <nav className="navbar">
        <h1>Dan doktorata</h1>

        <div className="nav-links">
          <Link to="/home">Naslovna stranica</Link>
          <Link to={"/stuslu/myinvitations"}>Moje pozivnice</Link>
          <Link to={"/stuslu/students/"}>Studenti</Link>
          <button onClick={LogoutFunction}>Odjavi se</button>
        </div>

      </nav>
    );
  }

  if(localStorage.role === "exhibition-manager") {

    return(
      <nav className="navbar">
          <h1>Dan doktorata</h1>

          <div className="nav-links">
            <Link to="/home">Students</Link>
            <button onClick={LogoutFunction}>Logout</button>
          </div>

        </nav>
    );  
  }



  return (
    <></>
   );
}
 
export default NavigationBar;