import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-users-container",
  templateUrl: "./users-container.component.html",
  styleUrls: ["./users-container.component.less"],
})
export class UsersContainerComponent implements OnInit, OnDestroy {
  public usersList: Observable<User[]>;
  private componentDestroyed$: Subject<boolean> = new Subject();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  public gotoEditUser(id: string): void {
    this.router.navigate(["updateUser", id]);
  }

  public deleteUser(id: string) {
    this.userService
      .deleteUser(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
        this.getUsers();
      });
  }

  private getUsers(): void {
    this.usersList = this.userService.getUsers();
  }

  userDetails(id: number) {
    this.router.navigate(["viewUser", id]);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
