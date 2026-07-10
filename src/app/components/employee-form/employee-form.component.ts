import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Country } from '../../models/country';
import { State } from '../../models/state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  @Output() employeeSaved = new EventEmitter<void>();
  @Input() set editEmployee(emp: Employee | null) {
    if (emp) {
      this.isEditMode = true;
      this.editingId = emp.employeeId!;
      this.populateForm(emp);
    }
  }

  employeeForm!: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  isEditMode = false;
  editingId: number = 0;
  existingMobileNumbers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  // Lifecycle hook - initializes form, loads countries and existing mobile numbers
  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
    this.loadExistingMobileNumbers();
  }

  // Initializes the reactive form with validators for each field
  private initForm(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      age: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      mobileNum: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dob: [''],
      addressLine1: ['', [Validators.required, this.noSpecialCharsValidator]],
      addressLine2: ['', [this.noSpecialCharsValidator]],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required]
    });
  }

  // Custom validator - rejects values containing $, %, !, or + characters
  noSpecialCharsValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const forbidden = /[$%!+]/;
    return forbidden.test(control.value) ? { specialChars: true } : null;
  }

  // Fetches the list of countries from the API for the dropdown
  private loadCountries(): void {
    this.employeeService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => this.toastr.error('Failed to load countries')
    });
  }

  // Loads all existing mobile numbers to check for duplicates before saving
  private loadExistingMobileNumbers(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.existingMobileNumbers = employees.map(e => e.mobileNum);
      }
    });
  }

  // Loads states when a country is selected and resets the state dropdown
  onCountryChange(): void {
    const countryId = +this.employeeForm.get('countryId')!.value;
    if (countryId) {
      this.employeeService.getStatesByCountry(countryId).subscribe({
        next: (data) => {
          this.states = data;
          this.employeeForm.patchValue({ stateId: '' });
        }
      });
    } else {
      this.states = [];
    }
  }


  // Calculates age from date of birth and validates it's not a future date
  onDobChange(): void {
    const dob = this.employeeForm.get('dob')!.value;
    if (dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      if (birthDate > today) {
        this.toastr.warning('Date of birth cannot be a future date');
        this.employeeForm.patchValue({ dob: '' });
        return;
      }
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.employeeForm.patchValue({ age: age });
    }
  }

  // Handles form submission - validates, checks duplicates, then creates or updates
  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formValue = this.employeeForm.value;

    // Check duplicate mobile number
    const mobileNum = formValue.mobileNum;
    if (!this.isEditMode && this.existingMobileNumbers.includes(mobileNum)) {
      this.toastr.error('Already registered user. Please enter a new one');
      return;
    }
    if (this.isEditMode) {
      const otherNumbers = this.existingMobileNumbers.filter((_, i) => {
        return true; 
      });
    }

    const employee: Employee = {
      employeeName: formValue.employeeName,
      age: +formValue.age,
      mobileNum: formValue.mobileNum,
      pincode: formValue.pincode,
      dob: formValue.dob ? new Date(formValue.dob).toISOString() : undefined,
      addressLine1: formValue.addressLine1,
      addressLine2: formValue.addressLine2 || undefined,
      stateId: +formValue.stateId,
      countryId: +formValue.countryId
    };

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.editingId, employee).subscribe({
        next: () => {
          this.toastr.success('Employee updated successfully');
          this.resetForm();
          this.employeeSaved.emit();
        },
        error: (err) => {
          if (err.error && typeof err.error === 'string' && err.error.includes('duplicate')) {
            this.toastr.error('Already registered user. Please enter a new one');
          } else {
            this.toastr.error('Failed to update employee');
          }
        }
      });
    } else {
      this.employeeService.createEmployee(employee).subscribe({
        next: () => {
          this.toastr.success('Employee registered successfully');
          this.resetForm();
          this.employeeSaved.emit();
        },
        error: (err) => {
          if (err.error && typeof err.error === 'string' && err.error.includes('duplicate')) {
            this.toastr.error('Already registered user. Please enter a new one');
          } else {
            this.toastr.error('Failed to register employee');
          }
        }
      });
    }
  }

  // Fills the form fields with existing employee data for editing
  populateForm(emp: Employee): void {
    this.employeeForm.patchValue({
      employeeName: emp.employeeName,
      age: emp.age,
      mobileNum: emp.mobileNum,
      dob: emp.dob ? emp.dob.split('T')[0] : '',
      addressLine1: emp.addressLine1,
      addressLine2: emp.addressLine2 || '',
      pincode: emp.pincode,
      countryId: emp.countryId,
      stateId: emp.stateId
    });
    // Load states for the selected country
    if (emp.countryId) {
      this.employeeService.getStatesByCountry(emp.countryId).subscribe({
        next: (data) => {
          this.states = data;
          this.employeeForm.patchValue({ stateId: emp.stateId });
        }
      });
    }
  }

  // Resets the form back to its initial state after save or cancel
  resetForm(): void {
    this.isEditMode = false;
    this.editingId = 0;
    this.employeeForm.reset();
    this.states = [];
    this.loadExistingMobileNumbers();
  }

  // Shortcut getter to access form controls in the template
  get f() {
    return this.employeeForm.controls;
  }
}
