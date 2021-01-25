import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  header = 'Filters';
  Years = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  launchOptions = ["True", "False"];
  landingOptions =  ["True", "False"];
  selectedYear: string;
  selectedLandStatus: string;
  selectedLaunchStatus: string;
  constructor(private appService: AppService){}


  launchHandler(val: string){
    this.selectedLaunchStatus = val;
    const status = val == 'True'?true:false
    const param = {
      launch_success: status
    }
     this.appService.getFilteredSpaceXData(param).subscribe();
  }

  landingHandler(val: string){
    this.selectedLandStatus = val;
    const status = val == 'True'?true:false;
    
    const param = {
      land_success: status
    }
     this.appService.getFilteredSpaceXData(param).subscribe();
  }
}