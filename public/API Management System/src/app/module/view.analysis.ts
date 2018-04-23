import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AppComponent} from '../app.component';
import { NgClass} from '@angular/common';
import {ChartsModule} from 'ng2-charts/ng2-charts';

@Component({
    selector: 'app-analysis',
    templateUrl:"./analytics.html",
    //这个路径是根据当前文件所在路径来的
    styleUrls:['./css/home.css']
})

export class AnalysisComponent implements OnInit{
    constructor (
                 private parent: AppComponent,
                 private route: ActivatedRoute,
                 private router: Router
    ) {}

    ngOnInit(){


    };










}


