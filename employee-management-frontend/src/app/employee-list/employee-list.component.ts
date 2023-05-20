

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any[] | undefined;
  

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
    
  }

  getEmployees() {
    this.http.get<any[]>('http://localhost:8000/employees').subscribe(
      response => {
      this.employees=response;
      console.log(this.employees);
        
      }
    );

  }

  deleteEmployee(id: number) {

    
    this.http.delete<any[]>(`http://localhost:8000/employee/${id}`).subscribe(
      (      data: any) => {
        console.log(data);
        this.getEmployees();
      }
    );
  }



  goToUpdateComponent(id:number) {
    this.router.navigate([`/update/${id}`]);
  }


  
}