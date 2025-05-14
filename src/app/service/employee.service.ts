import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private employees: Employee[] = [
    { id: 1, name: 'Ram', location: 'Banglore', email: 'ram@mail.com', mobile: '9867512345' },
    { id: 2, name: 'Raj', location: 'Chennai', email: 'raj@mail.com', mobile: '7867534521' },
    { id: 3, name: 'Vinay', location: 'Pune', email: 'vinay@mail.com', mobile: '9975287450' },
  ];

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }

  addEmployee(employee: Employee): void {
    // Assign a unique ID to the new employee
    employee.id = this.getNextId();
    this.employees.push(employee);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex((employee) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }

  private getNextId(): number {
    const maxId = Math.max(...this.employees.map((employee) => employee.id), 0);
    return maxId + 1;
  }
}
