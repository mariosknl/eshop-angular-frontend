import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy() {
    this.endSubs$.next(this.users);
    this.endSubs$.complete();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.delete(userId).subscribe(
          () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User Deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User Not Created!',
            });
          },
        );
      },
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  private _getUsers() {
    this.usersService
      .getUsers()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((users) => {
        this.users = users;
      });
  }
}
