import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-view-user",
  templateUrl: "./view-user.component.html",
  styleUrls: ["./view-user.component.less"],
})
export class ViewUserComponent implements OnInit, OnDestroy {
  id: string;
  user: User;
  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = new User();

    this.id = this.route.snapshot.params["id"];

    this.userService
      .getUserById(this.id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (user: User) => {
          this.user = user;
        },
        (error) => console.log(error)
      );
  }

  gotoUsersList() {
    this.router.navigate(["usersList"]);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
