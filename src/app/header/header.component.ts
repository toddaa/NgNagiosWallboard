import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Rx';

//import { NagiosService } from '../host/nagios.service';

@Component({
	moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  //title = 'LEIGHTRONIX Monitoring Dashboard - Component LEVEL'; 
  @Input() appTitle: string;
  @Input() appIcon: string;


  @Input() overviewOk: number;
  @Input() overviewWarning: number;
  @Input() overviewCritical: number;
  @Input() overviewUnknown: number;
	errorMessage: string;
  

  clock = Observable
    .interval(1000)
    .map(()=> new Date());

  constructor() { }

  ngOnInit() {
  }

}