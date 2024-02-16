import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Reboot';
  arr: any[] = [
    { num: 1 },
    { num: 2 },
    { num: 3 },
    { num: 4 },
    { num: 5 },
    { num: 6 },
    { num: 7 },
    { num: 8 },
    { num: 9 },
    { num: 10 },
    { num: 11 },
    { num: 12 },
  ];
  inputPen: any;
  penMiss = 1;
  visible: boolean = true;

  startIndex = 0;
  endIndex = 5;
  pageSize = 5;

  constructor(private apiService: ApiService) {
    this.callPen();
  }

  callPen() {
    this.apiService.getPen().subscribe((data) => {
      this.inputPen = data;
      this.penMiss = 0;
      console.warn('pen data', data);
    });
  }

  remove() {
    this.visible = false;
  }

  getArrayLenght() {
    return Array.from({ length: this.arr.length / this.pageSize });
  }

  getIndex(pageIndex: any) {
    this.startIndex = pageIndex * this.pageSize;
    this.endIndex = this.min(this.startIndex + this.pageSize, this.arr.length-1);
    console.log(this.startIndex);
  }

  changeIndex(i: number) {
    if (this.startIndex + this.pageSize > this.arr.length) {
      return;
    }
    this.startIndex = this.startIndex + this.pageSize * i;
    this.endIndex = this.min(this.endIndex + this.pageSize * i, this.arr.length);
    if (this.startIndex <= 0) {
      this.startIndex = 0;
      this.endIndex = this.min(this.pageSize, this.arr.length);
    }
    console.log(this.startIndex, this.endIndex);
  }

  min(a: number, b: number): number {
    return a > b ? b : a;
  }
}
