import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function BookEditor({showToast}) {

  const {bookId} = useParams();
  const [book, setBook] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`, {withCredentials: true})
      .then(response => {
        setBook(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch((error) => console.log(error));
    },[]);

    function onBookUpdate(evt) {
      evt.preventDefault();
      console.log(`Submit Triggered`);

      const updatedBook = {
        ...book,
        title,
        description
    }

    delete updatedBook._id;

    axios.put(`${import.meta.env.VITE_API_URL}/api/books/update/${bookId}`,
    {...updatedBook}, {withCredentials: true})
    .then(response => {
      console.log(response.data);
      showToast(response.data.message, "success");
      navigate("/");
    })
    .catch(error => console.log(error));
  }

  return(
    <>
      <h1>Book Editor Component - {bookId}</h1>
      <form onSubmit={(evt) => onBookUpdate(evt)}>
          <div>
            <label htmlFor="txtTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="txtTitle" value={title} onChange={(evt) => setTitle(evt.target.value)}/>
          </div>
          <div>
            <label htmlFor="txtDescription" className="form-label">Description</label>
            <textarea className="form-control" id="txtDescription" value={description} onChange={(evt) => setDescription(evt.target.value)}></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Update Book</button>
          </div>
      </form>
    </>
  )
}