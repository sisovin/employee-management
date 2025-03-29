import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createEmployee, updateEmployee, getEmployeeById } from '../api/employeeApi';

const EmployeeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [employeeData, setEmployeeData] = useState({ name: '', position: '', salary: '' });

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        const data = await getEmployeeById(id);
        setEmployeeData(data);
      };
      fetchEmployee();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateEmployee(id, employeeData);
    } else {
      await createEmployee(employeeData);
    }
    history.push('/dashboard');
  };

  return (
    <div>
      <h1>{id ? 'Edit Employee' : 'Create Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={employeeData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Position:</label>
          <input type="text" name="position" value={employeeData.position} onChange={handleChange} required />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} required />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
