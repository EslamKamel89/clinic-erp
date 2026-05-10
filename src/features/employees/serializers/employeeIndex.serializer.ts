import type { Employee, EmployeeRaw } from "../types/employee.types";
import { serializeEmployee } from "./employee.serializer";

export const serializeEmployeeIndexResponse = (
  employeesRaw: EmployeeRaw[],
): Employee[] => {
  return employeesRaw.map(serializeEmployee);
};
