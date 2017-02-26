import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nagios Wallboard'; 
  icon = 'fa-heartbeat';

  apiURL = 'http://10.127.11.17:8080/state';

  overviewOk: number;
  overviewWarning: number;
  overviewCritical: number;
  overviewUnknown: number;
	errorMessage: string;

  nagHostsIssue: any[] = [];
	nagHostsOK: any[] = [];

  constructor() { }

  ngOnInit() {
    
  }
}
