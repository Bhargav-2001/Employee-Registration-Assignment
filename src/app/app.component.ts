import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent, EmployeeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(EmployeeListComponent) employeeList!: EmployeeListComponent;
  @ViewChild(EmployeeFormComponent) employeeForm!: EmployeeFormComponent;

  editingEmployee: Employee | null = null;

  onEmployeeSaved(): void {
    this.editingEmployee = null;
    if (this.employeeList) {
      this.employeeList.loadEmployees();
    }
  }

  onEditRequested(employee: Employee): void {
    this.editingEmployee = employee;
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
