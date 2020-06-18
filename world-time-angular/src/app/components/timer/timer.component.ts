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
  interval;

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
      this.localUpdateTime();
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

  localUpdateTime() {
    this.interval = setInterval(() => {
      this.seconds = parseInt(this.seconds) + 1;

      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes = parseInt(this.minutes) + 1;
      }
      if (this.minutes == 60) {
        this.minutes = 0;
        this.hours = parseInt(this.hours) + 1;
      }
      if (this.hours == 24) {
        this.hours = 0;
      }
    }, 1000);
  }
}


