import { useEffect, useState } from 'react';
import axios from 'axios';
import './Pagination.css';

export function Pagination() {

  const [employees, setEmployees] = useState([]);
  const [tableRows, setTableRows] = useState({startRow: 0, endRow: 9});
  const [page, setPage] = useState(1);

  const fetchEmployees = async() => {
    try {
      const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      setEmployees(response.data);
    } catch(err) {
      alert("failed to fetch data");
      console.log(err);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, [])

  console.log(employees);   // 46
  console.log(tableRows.startRow, tableRows.endRow);   // 0  9

  const handlePrevious = () => {
    if(page === 1) {
      return;
    } else {
      setTableRows((prevRows) => ({
        ...prevRows,
        startRow: prevRows.startRow - 10,
        endRow: prevRows.endRow - 10
      }));
      setPage(page - 1);
    }
  }

  let numberOfPages = Math.ceil(employees.length/10);
  console.log(numberOfPages); // 5

  const handleNext = () => {
    if(page >= numberOfPages) {
      return;
    } else {
      setTableRows((prevRows) => ({
        ...prevRows,
        startRow: prevRows.startRow + 10,
        endRow: prevRows.endRow + 10
      }));
      setPage(page + 1);
    }
  }

  return (
    <div className='page'>
      <h1>Employee Data Table</h1>
      <table align='center'>
        {/* <tr> cannot appear as a child of <table>. Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser */}
        <thead>
          <tr>
            <th>ID</th> {/* <th> cannot appear as a child of <table>. Wrap it inside <tr> tag */}
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.slice(tableRows.startRow, tableRows.endRow+1).map((employee) => {
            return <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                  </tr>
            })
          }
        </tbody>
      </table>
      <button onClick={handlePrevious}>Previous</button>
      <button>{page}</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}