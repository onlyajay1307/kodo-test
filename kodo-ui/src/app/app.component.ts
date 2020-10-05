import { Component, OnInit } from '@angular/core';
import { FeedService } from '../providers/feed.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  feedList: string[];
  totalResults: any;
  currentPage: any = 1;
  pageSize: any = 10;
  sortBy: any = null;
  keyword: any = null;
  ngOnInit() {
    this.getFeedData();
  }

  constructor(private feedService: FeedService) {
  }

  handlePage(e: any) {
    this.currentPage = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getFeedData();
  }

  handleChange(e: any){
    // console.log("e", e.value);
    this.sortBy = e.value;
    this.getFeedData();
  }

  getFeedData() {
    this.feedService.getFeed(this.currentPage, this.pageSize, this.sortBy, this.keyword).subscribe((response) => {
      const result = response;
      if (result.statusCode == 200) {
        this.feedList = result.data.results;
        this.totalResults = result.data.totalResults;
      }
      else {
        this.feedList = [];
        this.totalResults = 0;
      }
    },
      (error) => {
        console.log('getFeedData', error);
      }
    )
  }
}
