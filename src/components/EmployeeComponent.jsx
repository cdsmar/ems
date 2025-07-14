import React,{useState , useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {createEmployee , getEmployee, updateEmployee, deleteEmployee } from '../services/EmployeeService.js'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const {id} = useParams()
    const [errors,setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigate=useNavigate()
    useEffect(()=>{
        getAllEmployees()
    },[id])

    
    function saveOrUpdateEmployee(e){
        e.preventDefault()
        if(validateForm()){
            const employee={firstName,lastName,email}
            console.log(employee)
            if(id){
                updateEmployee(id,employee).then((response)=>{
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error=>{
                    console.log(error);
                })
            }
            

            createEmployee(employee).then((response)=>{
                console.log(response.data);
                navigate('/employees')
            }).catch(error=>{
                console.log(error);
            })
        }
    }
 function getAllEmployees(){
           if(id){
               getEmployee(id).then((response)=>{
                   setFirstName(response.data.firstName);
                   setLastName(response.data.lastName);
                   setEmail(response.data.email);
               }).catch(error=>{
                   console.log(error);
               })
           }
       }
    function validateForm() {
        let valid = true;
        let errorsCopy={...errors};
        if(firstName.trim()) {
            errorsCopy.firstName = '';
        }
        else{
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()) {
            errorsCopy.lastName = '';
        }
        else{
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()) {
            errorsCopy.email = '';
        }
        else{
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }
        else{
            return <h2 className="text-center">Add Employee</h2>
        }
    }


    return(
        <div className="container">
            <br/><br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">First Name</label>
                                <input type='text' placeholder='Enter Employee first name' name='firstName' 
                                value={firstName} className={` form-control ${errors.firstName ? 'is-invalid':''}`} onChange={(e) => setFirstName(e.target.value)}></input>
                                { errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}

                                <label className="form-label">Last Name</label>
                                <input type='text' placeholder='Enter Employee last name' name='lastName' 
                                value={lastName} className={` form-control ${errors.lastName ? 'is-invalid':''}`} onChange={(e) => setLastName(e.target.value)}></input>
                                { errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}

                                <label className="form-label">Email</label>
                                <input type='password' placeholder='Enter Employee email' name='email' 
                                value={email} className={` form-control ${errors.email ? 'is-invalid':''}`} onChange={(e) => setEmail(e.target.value)}></input>
                                { errors.email && <div className='invalid-feedback'>{errors.email}</div>}

                            </div>
                            <button className='btn btn-success' type='submit' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmployeeComponent