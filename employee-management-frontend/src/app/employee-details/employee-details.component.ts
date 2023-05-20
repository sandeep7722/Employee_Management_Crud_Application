import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit{
  
  employee_new = {
    employee_id: 0,
    employee_name:'',
    employee_email:'',
    employee_manager:''
    
  };


  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute) {  }
  
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.employee_new.employee_id=id;
      
    });
    this.getEmployee(this.employee_new.employee_id);
  }


  getEmployee(id:any) {
    this.http.get<any>(`http://localhost:8000/employee/${id}`)
        .subscribe(employee => {
          const arr = Object.values(employee)
          this.employee_new.employee_name=employee.name;
          this.employee_new.employee_email=employee.email;
          this.employee_new.employee_manager=employee.manager;
          console.log(arr);
         
        });
   
  }

  deleteEmployee(id: number) {

    
    this.http.delete<any[]>(`http://localhost:8000/employee/${id}`).subscribe(
      (      data: any) => {
        console.log(data);
        
        this.goToListComponent(id);
        
   
      }
    );
  }

  goToListComponent(id:number)
  {
    this.router.navigate([`/list`]);
  }

  goToUpdateComponent(id:number) {
    this.router.navigate([`/update/${id}`]);
    
  }


}
