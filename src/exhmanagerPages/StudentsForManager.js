import axios from "axios";
import { useEffect, useState } from "react";
import StudentsListForExhManager from "./StudentsListForExhManager";

const StudentsForManager = () => {

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
     <StudentsListForExhManager studentsList={studentsAsList} description={"Pregledajte studente i njihove zahtjeve"} /> 
   );
}
 
export default StudentsForManager;