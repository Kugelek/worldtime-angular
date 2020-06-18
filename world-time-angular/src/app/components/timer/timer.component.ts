import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timeObj;
  hours;
  minutes;
  seconds;
  timeZone: string;
  interval;

  constructor(private timeService: TimeService) {
  }

  ngOnInit(): void {
    //initial state
    this.setComponentData('Europe/Warsaw', true);
  }

  updateTime(timeZone: string): void {
    this.setComponentData(timeZone, false);
  }

  //fetch observable from API, set component fields
  setComponentData(timeZone: string, shouldStartLocalTimer: boolean): void {
    this.timeService
      .fetchTime(timeZone)
      .subscribe(fetchedTime => {
        this.timeObj = fetchedTime;
        this.timeZone = this.timeObj.timezone;
        [this.hours, this.minutes, this.seconds] = [...this.timeObj.datetime.split('T')[1].split(':')];
        this.seconds = this.seconds.slice(0, 5);
        if (shouldStartLocalTimer)
          this.localUpdateTime();
      });
  }

  localUpdateTime(): void {
    this.interval = setInterval(() => {
      this.seconds = parseInt(this.seconds) + 1;
      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes = parseInt(this.minutes) + 1;

        if (this.minutes == 60) {
          this.minutes = 0;
          this.hours = parseInt(this.hours) + 1;

          if (this.hours == 24)
            this.hours = 0;
        }
      }
      //zero prefix added to 1digit parts
      [this.hours, this.minutes, this.seconds] = [...[this.hours, this.minutes, this.seconds].map(timePart =>
        timePart.toString().length === 1 ? `0${timePart}` : `${timePart}`)];

    }, 1000);
  }



}


