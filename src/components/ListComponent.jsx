import React, { useState, useEffect } from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListComponent = () => {
    const [employees, setEmployees] = useState([])  // <-- added this line
    const navigate = useNavigate();

    useEffect(() => {
        listEmployees()
            .then(response => setEmployees(response.data))
            .catch(error => console.error(error));
    }, [])

    function addNewEmployee() {
        navigate('/add-employee')
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        deleteEmployee(id)
            .then(() => {
                // Remove deleted employee from current state without refetching
                setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id))
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr> {/* you forgot this <tr> */}
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListComponent
