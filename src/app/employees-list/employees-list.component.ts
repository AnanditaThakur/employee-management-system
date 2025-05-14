import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[]=[];
  totalEmployees: number=0;

  filterText: string = '';
  

  constructor(private employeeService: EmployeeService ,private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  filterEmployees() {
    if (this.filterText) {
      const filterTextLowerCase = this.filterText.toLowerCase();
      this.employees = this.employees.filter(employee =>
        employee.name.toLowerCase().startsWith(filterTextLowerCase)
      );
    } else {
      this.getEmployees();
    }
    this.totalEmployees = this.employees.length;
  }

  getEmployees() {
    this.employees = this.employeeService.getEmployees().sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
    this.totalEmployees = this.employees.length;
  }

  employeeDetails(id: number){
    this.router.navigate(["/details/:id", id]);
  }

  editEmployee(id: number){
    this.router.navigate(["/editEmployee/", id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id);
      this.getEmployees();
  }
}
