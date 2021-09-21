import { Component, OnInit } from '@angular/core';
import { Notice } from '../../../models/Notice';
import { NoticeService } from '../../../Services/Notices/notice.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent implements OnInit {
  notices!: Notice[];
  constructor(private noticeService: NoticeService) {}

  ngOnInit(): void {
    if (
      this.noticeService.getNotice().subscribe((notice) => {
        this.notices = notice;
      }) == null
    ) {
    }
  }
}
