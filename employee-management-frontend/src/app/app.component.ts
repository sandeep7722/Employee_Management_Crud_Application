import { Component,NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-frontend';
  inputValue: string | undefined;
  
  constructor(private router: Router) { }
  goToCreateComponent() {
    this.router.navigate(['/create']);
  }
  goToListComponent() {
    this.router.navigate(['/list']);
  }

  submitInput() {
    
    this.router.navigate([`/details/${this.inputValue}`]);
  }
}
