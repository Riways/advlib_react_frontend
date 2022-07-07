import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import BookInfo from "./components/book_info/BookInfo";
import Login from "./components/login/Login";
import Register from "./components/registration/Register";
import UploadBook from "./components/upload_book/UploadBook";
import axios from "axios";
import Logout from "./components/logout/Logout";

function App() {
  const currDateInMillis = Date.now();

  const user = JSON.parse(localStorage.getItem("user"));
  
  if (user && user.expirationTimeInMillis > currDateInMillis) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.jwt;
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", user.authorities[0]);
  } else {
    localStorage.clear();
    localStorage.setItem("isLoggedIn", "");
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book-info" element={<BookInfo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload-book" element={<UploadBook />} />
    </Routes>
  );
}

export default App;
