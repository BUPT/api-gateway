import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass} from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-health',
  templateUrl: './flowControl.component.html',
  styleUrls:['./flowControl.component.css']
})
export class flowControlComponent implements OnInit {



  constructor (
                 private parent: NavComponent,
                 private route: ActivatedRoute,
                 private router: Router
    ) {}

    ngOnInit(){
        this.parent.setActiveByPath(this.parent.flowControl,"");

    };
    
}