import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit  {
  employee = {
    employee_id: 0,
    employee_name: '',
    employee_email: '',
    employee_manager: ''
  };

  constructor(private http: HttpClient,private router: Router) {}
  ngOnInit() {
  }

  onSubmit(): void {
    this.http.post<any>('http://localhost:8000/employee/', this.employee).subscribe(response => {
      console.log(response);
      alert(response.message);
    });
  }


  

}
