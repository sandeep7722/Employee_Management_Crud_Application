import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit{
  employee_new = {
    employee_id: 0,
    employee_name: '',
    employee_email: '',
    employee_manager: ''
  };

  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute) {

    
  }
 
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.http.get<any>(`http://localhost:8000/employee/${id}`)
        .subscribe(employee => {
          //this.employee_new = employee;
          console.log(employee);
          this.employee_new.employee_id=employee.id;
          this.employee_new.employee_name=employee.name;
          this.employee_new.employee_email=employee.email;
          this.employee_new.employee_manager=employee.manager;
          console.log(this.employee_new);
        });
    });
  }
 


  onSubmit(): void {
    
  }
  updateData(id:number)
  {
    this.http.put<any>(`http://localhost:8000/employee/${id}`, this.employee_new).subscribe(response => {
      console.log(response);
      alert("Updated Successfully!");
    });
  }


}
