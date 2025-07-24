import { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeTable.css";

const PAGE_SIZE = 10;

export default function EmployeeTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => setData(res.data))
      .catch(() => alert("failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const currentRows = data.slice(startIdx, endIdx);

  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="container">
      <h2>Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pag-btn"
        >
          Previous
        </button>
        <span className="pag-page">{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pag-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}
