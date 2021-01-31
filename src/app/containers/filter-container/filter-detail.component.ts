import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-filter-detail',
  templateUrl: './filter-detail.component.html',
})
export class FilterDetailComponent implements OnInit {
 @Input() year : string;
 @Output() eventEmitter: EventEmitter<any> = new EventEmitter();
 selectedYear: string;
 
 private eventListener = new BehaviorSubject<any>(null);
 public events$ = this.eventListener.asObservable();
 constructor(private service:  AppService){}

 ngOnInit(){}

 launchHandler(year : string){
   this.selectedYear = year;
   this.eventEmitter.emit(this.selectedYear);
   const param = {
     launch_year: year
   }
   this.service.getFilteredSpaceXData(param).subscribe(data=> this.eventListener.next(data))
 }
}