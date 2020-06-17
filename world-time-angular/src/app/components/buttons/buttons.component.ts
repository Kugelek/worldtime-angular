import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Output() someEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  changeTimeZone(timeZone) {
    console.log("XD");
    this.someEvent.next(timeZone);
  }

}
