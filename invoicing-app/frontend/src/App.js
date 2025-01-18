import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

const MainApp = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(0); // Total pages

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page) => {
    axios
      .get(`http://localhost:5000/data?page=${page}&limit=${itemsPerPage}`) // Add query parameters
      .then((response) => {
        setData(response.data.items); // Assume the backend returns an 'items' array
        setTotalPages(response.data.totalPages); // Assume the backend returns 'totalPages'
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Data from SQL Database</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to the App</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainApp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
