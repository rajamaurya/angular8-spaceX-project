import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{
    isLoading;
    constructor(private loader: LoaderService){}
   
    ngOnInit(){

        this.loader.loader$.subscribe(loaded => {
           this.isLoading = loaded;
        })
    }
  
}