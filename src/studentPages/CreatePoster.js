import axios from 'axios';
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const CreatePoster = () => {

  const [posterImageURL, setPosterImageURL] = useState("");

  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

      //handle submit for form -> can be split into separate compoment
      const handleSubmit = (e) => {

        e.preventDefault();
        setIsPending(true);
        const poster = {imageURL : posterImageURL, studentID : id, posterStatus: "created"};
         axios.post("http://localhost:8080/student/addposter/" + id, poster)
        .then( (res) => {
          setIsPending(false);
          const pathToRedirect = "/mydata/" + id;
          navigate(pathToRedirect);
        }) 
  
      }


  return ( 
    <div className="create-poster">
    <h2> Ovdje možete stvoriti svoj poster</h2>
    <form onSubmit={handleSubmit}>
      <label className='poster-create-text' htmlFor="posterlink">Ovdje unesite svoj Google Drive Link na kojem se nalazi poster</label>
      <input type="text" required placeholder='npr. https://drive.google.com/drive/folders/nekaputanja' onChange={(e) => setPosterImageURL(e.target.value)} id="posterlink" name ="posterlink"/>
      {!isPending && <button>Dodajte svoj poster</button>}
      {isPending && <button disabled>Dodajem poster</button>}
      
    </form>
  </div>
   );
}
 
export default CreatePoster;