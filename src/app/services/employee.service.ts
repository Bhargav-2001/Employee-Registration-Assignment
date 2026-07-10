import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Country } from '../models/country';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:5065/api';

  constructor(private http: HttpClient) {}

  // Fetches all employees from the database
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/Employee`);
  }

  // Fetches a single employee by their ID
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/Employee/${id}`);
  }

  // Creates a new employee record
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/Employee`, employee);
  }

  // Updates an existing employee by ID
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/Employee/${id}`, employee);
  }

  // Deletes an employee by ID
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Employee/${id}`);
  }

  // Fetches all available countries for the dropdown
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/Country`);
  }

  // Fetches states filtered by the selected country ID
  getStatesByCountry(countryId: number): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}/State/${countryId}`);
  }
}
