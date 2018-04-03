import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.css']
})
export class ClientPanelComponent implements OnInit {
    @HostBinding('attr.class') class = 'content-container';
    constructor() { }

  ngOnInit() {
  }

}
