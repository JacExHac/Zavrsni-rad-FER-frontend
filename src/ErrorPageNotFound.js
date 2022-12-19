import { Link } from "react-router-dom";

const ErrorPageNotFound = () => {
  return ( 
    <div className="error-div">
      <h2>Page not found...</h2>
      {localStorage.getItem("role") === null ? <Link to="/">Login please</Link> : <Link to="/home">Go home</Link>}
    </div>
   );
}
 
export default ErrorPageNotFound;