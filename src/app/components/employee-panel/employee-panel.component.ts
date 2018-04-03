import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.css']
})
export class EmployeePanelComponent implements OnInit {
  @HostBinding('attr.class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
