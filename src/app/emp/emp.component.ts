import { Component, OnInit } from '@angular/core';
import { EmpService } from '../services/emp.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  public isLoading: boolean = false;
  public userList: any[];
  public employeeList: any[]
  public joinCallObservable;
  constructor(private empService: EmpService) { }

  ngOnInit() {
  }

  getList(): void {
    this.isLoading = true;
    this.joinCall();
    console.log('Call getEmployees and getUsers');
    this.joinCallObservable.subscribe(() => {
      this.isLoading = false;
      console.log('All HTTP calls successful');
    }, error => {
      this.isLoading = false;
      alert('error');
    });
  }

  private joinCall() {
    const getEmployees = this.empService.getEmployees();
    const getUsers = this.empService.getUsers();
    this.joinCallObservable = forkJoin(getEmployees, getUsers)
      .pipe(map((responseArray: [any[], any[]]) => {
        this.employeeList = responseArray[0];
        this.userList = responseArray[1];
        return responseArray;
      }));
  }

}
