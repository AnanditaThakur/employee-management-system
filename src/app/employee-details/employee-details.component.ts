import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any; // Define the employee property to store employee data

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    // Retrieve the employee ID from the route parameters
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    
    // Use the EmployeeService to fetch employee details by ID
    this.employee = this.employeeService.getEmployeeById(id);
  }

  return(): void{
    this.router.navigate(['/employees']);
  }
}
