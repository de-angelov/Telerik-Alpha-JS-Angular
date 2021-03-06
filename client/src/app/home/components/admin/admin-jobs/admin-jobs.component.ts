import { Component, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { EventEmitter } from 'events';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth/auth.service';
import { JobService } from './../../../../core';
import { AddJobComponent } from './../../../../shared/modules/popups/add-job/add-job.component';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css'],
})
export class AdminJobsComponent implements OnInit {

  public addJobComponentRef: MatDialogRef<AddJobComponent>;
  private currentUserEmail: string;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              public toastr: ToastrService,
              private jobService: JobService) {}

  public ngOnInit(): void {
                console.log('Admin Jobs Page Opened!');
                this.currentUserEmail = this.authService.getCurrentUserEmail();
  }

  public addJobModal(): void {
    console.log('Add-job Modal Opened!');
    this.addJobComponentRef = this.dialog.open(AddJobComponent);
    this.addJobComponentRef
      .afterClosed()
      .subscribe((jobObj) => {
        console.log('Sending new job data to JobService!', jobObj);
        this.jobService.createJob(jobObj)
          .subscribe(
           (reply) => {
          console.log('Client post succesful => Job Details: ', reply);
          this.toastr.success(`${jobObj.title} added!`, 'Success');
        }, (error) => {
          console.log('Sending data to JobService failed! ', error, jobObj);

          this.toastr.error('New Job Failed!', 'Error');
      });
      },

                 (error) => {
        this.toastr.error('New Job Failed!', 'Error');
      });
  }
}
