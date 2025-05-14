import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  locations: string[] = ['Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
  selectedLocation!: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      // Add the new employee using the EmployeeService
      this.employeeService.addEmployee(employeeData);
      this.employeeForm.reset();
      // Navigate back to the employee list page
      this.router.navigate(['/employees']);
    }
  }
}
