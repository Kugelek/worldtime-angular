import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timeObj;
  timeDate;
  hours;
  minutes;
  seconds;
  timeZone;

  constructor(private timeService: TimeService) {
  }
  //TODO: refac
  ngOnInit(): void {
    this.timeService.fetchTime('Europe/Warsaw').subscribe(fetchedTime => {
      this.timeObj = fetchedTime;
      this.timeDate = this.timeObj.datetime;
      this.timeZone = this.timeObj.timezone;
      console.log(this.timeObj);
      [this.hours, this.minutes, this.seconds] = [...this.timeDate.split('T')[1].split(':')];
      this.seconds = this.seconds.slice(0, 5);
    });
  }

  updateTime(timeZone) {
    this.timeService.fetchTime(timeZone).subscribe(fetchedTime => {
      this.timeObj = fetchedTime;
      this.timeDate = this.timeObj.datetime;
      this.timeZone = this.timeObj.timezone;
      console.log(this.timeObj);
      [this.hours, this.minutes, this.seconds] = [...this.timeDate.split('T')[1].split(':')];
      this.seconds = this.seconds.slice(0, 2);
    });
  }


}
