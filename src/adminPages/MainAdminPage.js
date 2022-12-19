import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PeopleList from "./PeopleList";

const MainAdminPage = () => {

  const [studentsAsList, setStudentsAsList] = useState([]);
  const [role, setRole] = useState("student");

  const [stusluMembersAsList, setStusluMemberAsList] = useState([]);
  const [exhibitionManagerAsList, setExhibitionManagerAsList] = useState([]);

  //fetch student data
  useEffect( () => {
    axios.get("http://localhost:8080/student/allstudents")
    .then( (res) => {
      setStudentsAsList(res.data);
      console.log(res.data);
    })
  }, [role])


  //fetch stuslu data
  useEffect( () => {
    axios.get("http://localhost:8080/stuslu/allmembers")
    .then( (res) => {
      setStusluMemberAsList(res.data);
    })
  }, [role])


  //fetch manager data
  useEffect( () => {
    axios.get("http://localhost:8080/exhmanager/allmanagers")
    .then( (res) => {
      setExhibitionManagerAsList(res.data);
    })
  }, [role])



  //pregledavanje osoba po defaultu -> svaka osoba ima delete gumb gdje ju mozes obrisati -> kao notif page()
  //dodaj osobe forma (<clickable gumb da te odvede na formu>)


  return ( 
    <>
      <div className="move-to-adding-form">
      	<p> Kliknite <Link to="/admin/addpeople">OVDJE</Link> za dodavanje osoba</p>      
      </div>

      <select value={role} onChange = { (e) => setRole(e.target.value) }>
        <option value="student">Student</option>
        <option value="exhibition-manager">Voditelj izložbe</option>
        <option value="stu-slu-member">Član studentske službe</option>
      </select>

      {role==="student" ? 
        <PeopleList dataList={studentsAsList} role={role} description={"Pregledajte studente i, ukoliko želite, obrišite ih klikom na gumb"} /> 
      :
        <></>
      }

      {role==="stu-slu-member" ? 
        <PeopleList dataList={stusluMembersAsList} role={role} description={"Pregledajte članove studentske službe i, ukoliko želite, obrišite ih klikom na gumb"} /> 
      :
        <></>
      }

      {role==="exhibition-manager" ? 
        <PeopleList dataList={exhibitionManagerAsList} role={role} description={"Pregledajte voditelje izložbe i, ukoliko želite, obrišite ih klikom na gumb"} /> 
      :
        <></>
      }      
    
    </>
   );
}
 
export default MainAdminPage;