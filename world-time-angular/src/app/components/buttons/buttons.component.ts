import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Output() updateTimeEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  changeTimeZone(timeZone: string): void {
    this.updateTimeEvent.next(timeZone);
  }

}
