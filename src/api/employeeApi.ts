import axiosInstance from './axiosInstance';

const getEmployees = async () => {
  const response = await axiosInstance.get('/employees');
  return response.data;
};

const getEmployeeById = async (id: string) => {
  const response = await axiosInstance.get(`/employees/${id}`);
  return response.data;
};

const createEmployee = async (employeeData: object) => {
  const response = await axiosInstance.post('/employees', employeeData);
  return response.data;
};

const updateEmployee = async (id: string, employeeData: object) => {
  const response = await axiosInstance.put(`/employees/${id}`, employeeData);
  return response.data;
};

const deleteEmployee = async (id: string) => {
  const response = await axiosInstance.delete(`/employees/${id}`);
  return response.data;
};

export { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };
