import axios from "axios";
import { useEffect, useState } from "react";
import StudentsListForStuSlu from "./StudentsListForStuSlu";

const Students = () => {

  const [studentsAsList, setStudentsAsList] = useState([]);

  //fetch student data
  useEffect( () => {
    axios.get("http://localhost:8080/student/allstudents")
    .then( (res) => {
      setStudentsAsList(res.data);
      console.log(res.data);
    })
  }, [])

  return ( 
    
        <StudentsListForStuSlu studentsList={studentsAsList} description={"Pregledajte studente i, ukoliko želite, pozovite ih na dan doktorata"} /> 
      
   );
}
 
export default Students;