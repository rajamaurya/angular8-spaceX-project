import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class AppService{
    baseUrl =  environment.apiUrl + 'space-api';
    private params = {};

    private spaceX = new BehaviorSubject<any>(null);
    public _spacex$ = this.spaceX.asObservable();

    private _isSpaceXInitialized = new BehaviorSubject<Boolean>(false);
    public isSpacexInitialized$ = this._isSpaceXInitialized.asObservable();

    constructor(
        private http: HttpClient,
        private ls: LoaderService
        ){
        this.getSpaceXData({limit: 100});
    }

    handleError(error: Response | any){
        return throwError(error.message);
    }
    
    getSpaceXData(val){
         this.http.get(this.baseUrl,{params: val}).pipe(
              map(data=> data['data']),
              catchError(this.handleError)
              ).subscribe(data=>{
            if(data != undefined){
                this.SetSpaceXInitialized(true);
                this.spaceX.next(data);
            }   
        })
    }

    getFilteredSpaceXData(val){
      
        this.ls.show();
        if(this.params != {}){
            this.params = {...this.params , ...val}
        }
        
        return  this.http.get(this.baseUrl,{params: this.params}).pipe(
              map(data=> {
                  if(data['status'] == 'SUCCESS'){
                    this.spaceX.next(data['data']);
                    this.SetSpaceXInitialized(true);
                  }
              }),
              catchError(this.handleError)
              );
    }

    isSpacexInitialized(){
        return this.isSpacexInitialized$;
    }
    SetSpaceXInitialized(data){
        this._isSpaceXInitialized.next(data);
    }
    
  }