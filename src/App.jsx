import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from './components/NavBar';
import BookList from './components/BookList';
import LoginForm from './components/LoginForm';

function App() {

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fullName = localStorage.getItem("fullName");
    if(fullName) {
      setFullName(fullName);
    }
  }, []);

  return (
    <>
      <div className="container d-flex flex-column min-vh-100">
        <header>
          <NavBar fullName={fullName} setFullName={setFullName} />
        </header>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/login" element={<LoginForm setFullName={setFullName} />} />
            <Route path="/contact" element={<h1>Contact</h1>} />
          </Routes>
        </main>
        <footer>
          <h6>This is my footer</h6>
        </footer>
      </div>
    </>
  );
}

export default App;
