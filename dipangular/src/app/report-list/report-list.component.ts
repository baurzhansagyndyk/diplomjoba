import { Component, OnInit } from '@angular/core';
import { Report } from '../models/report.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  reports: Report[];
  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this._apiService.getReports().subscribe((response) => {
      this.reports = response;
    });
  }
}
