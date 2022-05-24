import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  public persons: Person[] = [];
  person: Person | undefined;
  newPerson: Person = new Person();

  constructor(private personService: PersonService, private router: Router){}
  ngOnInit(): void {
    this.getPersons();
  }

  public getPersons(): void{
    this.personService.getPerson().subscribe(
      (response: Person[]) => {this.persons = response}, 
      (error: HttpErrorResponse) => alert (error.message)
      );
  }


  public getPersonDetails(index: number): void{
    let id = (<HTMLInputElement>document.getElementById(""+ index)).id;
    console.log('id: ' + id);
    this.personService.getPersonDetails(index).subscribe(
      person => this.person = person);
  }

  public add(name: string, age:string): void {
    name = name.trim();
    age = age.trim();
    var x = Number(age);
    this.newPerson.age = x;
    this.newPerson.name = name;

    this.personService.addPerson(this.newPerson)
      .subscribe(person => {
        this.persons.push(person);
      });
  }

  
  delete(person: Person): void {
    this.persons = this.persons.filter(p => p !== person);
    this.personService.deletePerson(person.id).subscribe();
  }

  // public update(name: string, age:string, index: number): void {
  //   name = name.trim();
  //   age = age.trim();
  //   var x = Number(age);

  //   this.newPerson.age = x;
  //   this.newPerson.name = name;
  //   this.newPerson.id = index;

  //   this.personService.updatePerson(this.newPerson)
  //     .subscribe(person => { this.persons.push(person);
  //     });
  // }

  // updatePerson(id: number){
  //   this.router.navigate(['update-person', id])
  // }
}
