import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ViewPoster from './ViewPoster';



const MyData = () => {

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState([]);

  const { id } = useParams(); //student's ID number in database


  useEffect(()=>{
    axios.get("http://localhost:8080/student/mydata/" + id)
    .then(res=>{
      setUserData(res.data);
      console.log(res.data);
    }).catch(err=>{
      setError(err);
    })
  },[])




  return ( 
    <>
      <div className="my-data">

        <h2>Ovdje možete pregledati podatke o sebi i svome posteru</h2>


        <div className="my-personal-data">
          <h2>Osobni podatci:</h2>
          <p className="name">Ime: <span className='name-data'>{userData.name}</span></p>
          <p className="surname">Prezime: <span className='surname-data'>{userData.surname}</span></p>
          <p className="studentStatus">Moj status: <span className='student-status-data'>{userData.studentStatus}</span></p>
          <p className="jmbag">JMBAG: <span className='jmbag-data'>{userData.jmbag}</span></p>
          <p className="username">Username: <span className='uername-data'>{userData.username}</span></p>
        </div>

        <div className='poster-data'>
          <h2>Podatci o posteru:</h2>
          {userData.posterURL !== null ? 
            <>
              <p className="posterURL">Google Drive link mog postera: <a href={userData.posterURL}>{userData.posterURL}</a></p>
              <p className="posterStatus">Status mog postera: <span className='poster-status'>{userData.posterStatus}</span></p>
            </>
          : 
            <>
            <p>Još uvijek niste stvorili svoj poster!</p>
            <p>Kliknite <Link to={"/createposter/"+userData.studentID}>OVDJE</Link> kako biste stvorili poster</p>
            </>
          }

          {userData.posterURL !== null && (userData.posterStatus === "created" || userData.posterStatus === "pending" || userData.posterStatus === "accepted" || userData.posterStatus === "declined") ? 
            <>
              <p>Kliknite <Link to={"/poster/" + userData.studentID}>OVDJE</Link> kako biste detaljnije pregledali podatke o svom posteru </p>
            </>
          :
            <>
            </>
          }
        </div>        

      </div>
    </>
   );
}
 
export default MyData;