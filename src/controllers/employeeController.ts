import { Context } from 'hono';
import { Employee, db } from '../models/employee.ts';

const getAllEmployees = async (ctx: Context) => {
  const employees = await db.select().from(Employee);
  return ctx.json(employees);
};

const createEmployee = async (ctx: Context) => {
  const { name, position, salary } = await ctx.req.json();
  await db.insert(Employee).values({ name, position, salary });
  return ctx.json({ message: 'Employee created successfully' });
};

const updateEmployee = async (ctx: Context) => {
  const { id } = ctx.req.param();
  const { name, position, salary } = await ctx.req.json();
  await db.update(Employee).set({ name, position, salary }).where({ id });
  return ctx.json({ message: 'Employee updated successfully' });
};

const deleteEmployee = async (ctx: Context) => {
  const { id } = ctx.req.param();
  await db.delete().from(Employee).where({ id });
  return ctx.json({ message: 'Employee deleted successfully' });
};

export const employeeController = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
