import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notify } from '../../../core/models/notify.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'tl-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {
  notify$?: Observable<Notify | null>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    //subscription
    this.notify$ = this.notificationService.notify$;
  }

  closeNotification() {
    this.notificationService.clear();
  }
}
