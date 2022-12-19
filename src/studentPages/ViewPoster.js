import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import StudentPosterStatus from "./StudentPosterStatus";
import CreatePoster from "./CreatePoster";

const AddPoster = () => {

  const [posterData, setPosterData] = useState("");
  const [errorPosterData, setErrorPosterData] = useState("");

  const [studentPosterRequest, setStudentPosterRequest] = useState("");
  const [errorStudentPosterRequest, setErrorStudentPosterRequest] = useState("");


  const { id } = useParams();

  //get poster data: imageURL, posterStatus, studentID
    useEffect(()=>{
      axios.get("http://localhost:8080/student/poster/" + id)
      .then(res=>{
        setPosterData(res.data);
        console.log(res.data);
      }).catch(err=>{
        setErrorPosterData(err);
      })
 
    },[]);
  
    //get posterrequeststatus: studentID, numOfChange, managerComment, lastEditedBy, studentComment, jmbag
    useEffect(()=>{
      axios.get("http://localhost:8080/student/posterrequest/" + id)
      .then(res=>{
        setStudentPosterRequest(res.data);
        console.log(res.data);
      }).catch(err=>{
        setErrorStudentPosterRequest(err);
      })
    },[]);




  if(posterData !== "") {
    return (
      <>
        <div className="poster-data-detailed-info">
          <p>Link na Google Drive: <a href={posterData.imageURL}>{posterData.imageURL}</a></p>
          <p>Status mog postera: {posterData.posterStatus}</p>


        {posterData.posterStatus === "accepted" ? 
          <p className="poster-status-dependent-p">Čestitamo! Vaš je poster prihvaćen, vidimo se na Danu doktorata!</p>
        :
          <></>
        }

        {posterData.posterStatus === "declined" ? 
          <p className="poster-status-dependent-p">Vaš je poster odbijen... javite se voditelju izložbe ako se ne slažete s ovom odlukom</p>
        :
          <></>
        }

        {studentPosterRequest !== "" ? 
          <StudentPosterStatus studentPosterRequest= {studentPosterRequest} id={id}/> 
        : 
          <></>
        }

        {(posterData.posterStatus === "accepted" || posterData.posterStatus === "declined") || studentPosterRequest !== "" ?  
          <></>
        :
          <> 
            <p className="poster-status-dependent-p">Još uvijek niste podnijeli zahtjev za prihvaćanjem Vašeg postera.</p>
            <p className="poster-status-dependent-p-link">Kliknite <Link to={"/sendposterrequest/"+posterData.studentID}>OVDJE</Link> kako biste podnijeli zahtjev</p>
          </>          
        }
        </div>
      </>
      );
  }

   if(posterData === "") {
    return ( 
      <CreatePoster id={id} />
     );
  } 
  }

 
export default AddPoster;