import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  /** GET: get all the persons */
  public getPerson(): Observable<Person[]> {
    const urlPersons = `${this.url}/persons`
    return this.http.get<Person[]>(urlPersons);
  }

  /** GET: get a person by id*/
  public getPersonDetails(id: number): Observable<Person> {
    const urlPerson = `${this.url}/person/${id}`
    return this.http.get<Person>(urlPerson);
  }

    /** POST: add a new Person*/
  addPerson(person: Person): Observable<Person> {
    const urlAddPerson = `${this.url}/addPerson`
    return this.http.post<Person>(urlAddPerson, person, this.httpOptions).pipe();
  }

  /** DELETE: delete the Person*/
  deletePerson(id: number): Observable<Person> {
    const urlDeletePerson = `${this.url}/deletePerson/${id}`
    return this.http.delete<Person>(urlDeletePerson, this.httpOptions).pipe();
  }

  /** PUT: update the Person on the server */
  // updatePerson(id: number, person: Person): Observable<any> {
  //   const urlUpdatePerson = `${this.url}/updatePerson/${id}`
  //   return this.http.put(urlUpdatePerson, person);
  // }

} 
  


