import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LoaderService } from 'src/app/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-space',
  templateUrl: './spacex.component.html',
  styleUrls: ['./spacex.component.css']
})
export class SpaceXComponent implements OnInit {
    spaceX$: Observable<any>;
    subscription: Subscription;
    isLoading;
    constructor(private appService: AppService, private ls: LoaderService){}

    ngOnInit(){
      
      this.ls.loader$.subscribe(loading =>{
        this.isLoading = loading;
      })
        this.subscription = this.appService.isSpacexInitialized().subscribe(data=>{
          if(data){
            this.spaceX$ = this.appService._spacex$;
            this.ls.hide();
          }
        }, error =>{
           this.ls.hide();
        })
       
    }

    // unsubscribe all subscriptions when component is destroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }
}