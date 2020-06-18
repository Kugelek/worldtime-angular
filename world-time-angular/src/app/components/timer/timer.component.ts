import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timeObj;
  timeDate: string;
  hours;
  minutes;
  seconds;
  timeZone: string;
  interval;

  constructor(private timeService: TimeService) {
  }
  //TODO: refac
  ngOnInit(): void {
    this.timeService.fetchTime('Europe/Warsaw').subscribe(fetchedTime => {
      this.timeObj = fetchedTime;
      this.timeDate = this.timeObj.datetime;
      this.timeZone = this.timeObj.timezone;
      [this.hours, this.minutes, this.seconds] = [...this.timeDate.split('T')[1].split(':')];
      this.seconds = this.seconds.slice(0, 5);
      this.localUpdateTime();
    });
  }

  updateTime(timeZone: string): void {
    this.timeService.fetchTime(timeZone).subscribe(fetchedTime => {
      this.timeObj = fetchedTime;
      this.timeDate = this.timeObj.datetime;
      this.timeZone = this.timeObj.timezone;
      [this.hours, this.minutes, this.seconds] = [...this.timeDate.split('T')[1].split(':')];
      this.seconds = this.seconds.slice(0, 2);
    });
  }

  localUpdateTime(): void {
    this.interval = setInterval(() => {
      this.seconds = parseInt(this.seconds) + 1;
      if (this.seconds < 10) this.seconds = `0${this.seconds.toString()}`;


      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes = parseInt(this.minutes) + 1;

        if (this.minutes == 60) {
          this.minutes = 0;
          this.hours = parseInt(this.hours) + 1;
          if (this.hours == 24) {
            this.hours = 0;
            if (this.hours < 10)
              this.hours = `0${this.hours.toString()}`;
          }
          if (this.minutes < 10) {
            this.minutes = `0${this.minutes.toString()}`;
          }
        }

      }

    }, 1000);
  }



}


