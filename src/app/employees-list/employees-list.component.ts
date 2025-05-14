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
  employees: Employee[] = [];
  totalEmployees: number = 0;
  filterText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private employeeService: EmployeeService, private router: Router) {}

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
    this.employees = this.employeeService
      .getEmployees()
      .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);

    this.totalEmployees = this.employees.length;
    this.totalPages = Math.ceil(this.totalEmployees / this.itemsPerPage);
  }

  employeeDetails(id: number) {
    this.router.navigate(['/details/:id', id]);
  }

  editEmployee(id: number) {
    this.router.navigate(['/editEmployee', id]);
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.deleteEmployee(id);
    }
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
    this.getEmployees(); // Reload the employee list
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getEmployees(); // Refresh the employee list based on the new page
    }
  }
}
