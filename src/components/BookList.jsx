import axios from "axios";
import {useState, useEffect} from "react";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/api/books/list", {withCredentials: true})
    .then(response => {
      setBooks(response.data);
    })
    .catch((error) => console.log(error)
    );
  }, []);

  return (
    <>
      <h1>Book List</h1>
      {!books.length ? <h2>No books to display</h2> : 
        books.map(book => {
        return(
          <div key={book.id}>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <p>{book.description}</p>
            </div>
        )
        })
      }
    </>
  );
}