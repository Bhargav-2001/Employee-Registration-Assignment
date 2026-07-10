import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  @Output() editRequested = new EventEmitter<Employee>();

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pagedEmployees: Employee[] = [];

  // Filter
  filterName: string = '';
  filterMobile: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  // Delete confirmation
  showDeleteConfirm: boolean = false;
  employeeToDelete: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  // Lifecycle hook - loads employees when component initializes
  ngOnInit(): void {
    this.loadEmployees();
  }

  // Fetches all employees from the API and applies current filters
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.applyFilter();
      },
      error: () => this.toastr.error('Failed to load employees')
    });
  }

  // Filters employees by name and mobile number, resets to page 1
  applyFilter(): void {
    this.filteredEmployees = this.employees.filter(emp => {
      const nameMatch = emp.employeeName.toLowerCase().includes(this.filterName.toLowerCase());
      const mobileMatch = emp.mobileNum.includes(this.filterMobile);
      return nameMatch && mobileMatch;
    });
    this.currentPage = 1;
    this.calculatePagination();
  }

  // Calculates total pages and slices the current page of employees
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedEmployees = this.filteredEmployees.slice(start, end);
  }

  // Navigates to a specific page number
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.calculatePagination();
    }
  }

  // Returns an array of page numbers for pagination buttons
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Emits the selected employee to the parent component for editing
  onEdit(employee: Employee): void {
    this.editRequested.emit(employee);
  }

  // Shows the delete confirmation dialog for the selected employee
  confirmDelete(employee: Employee): void {
    this.employeeToDelete = employee;
    this.showDeleteConfirm = true;
  }

  // Hides the delete confirmation dialog without deleting
  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.employeeToDelete = null;
  }

  // Calls the API to delete the employee and refreshes the list
  deleteEmployee(): void {
    if (this.employeeToDelete && this.employeeToDelete.employeeId) {
      this.employeeService.deleteEmployee(this.employeeToDelete.employeeId).subscribe({
        next: () => {
          this.toastr.success('Employee deleted successfully');
          this.showDeleteConfirm = false;
          this.employeeToDelete = null;
          this.loadEmployees();
        },
        error: () => this.toastr.error('Failed to delete employee')
      });
    }
  }
}
