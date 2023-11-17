import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/api/books/list", {withCredentials: true})
    .then(response => {
      setBooks(response.data);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Book List</h1>
      {!books.length ? <h2>Please <Link to='/login'>Login</Link> to see books</h2> : 
          <div className="row">
            {books.map((book) => (
              <div key={book._id}>
                </div>
            ))}
        </div>
      }
    </>
  );
}