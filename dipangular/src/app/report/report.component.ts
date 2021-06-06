import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  reportText = new FormControl('', Validators.required);
  constructor() {}

  ngOnInit() {}

  onNoClick(): void {}
}
