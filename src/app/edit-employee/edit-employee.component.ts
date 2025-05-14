import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee!: Employee;

  locations: string[] = ['Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const foundEmployee = this.employeeService.getEmployeeById(id);
  
    if (!foundEmployee) {
      this.router.navigate(['/employees']);
      return;
    }
  
    this.employee = foundEmployee;
  }
  

  onSubmit(): void {
    // Call the service to update the employee
    this.employeeService.updateEmployee(this.employee);
    this.router.navigate(['/employees']);
  }

  return(): void{
    this.router.navigate(['/employees']);
  }
}
