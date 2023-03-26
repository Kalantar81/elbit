import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";
import { CustomValidator } from "../custom-validators/custom-validator";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.less"],
})
export class AddUserComponent implements OnInit, OnDestroy {
  addUserForm: FormGroup;
  submitted = false;
  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.initAddUserForm();
  }

  save() {
    const user: User = {
      name: this.addUserForm.get("name").value,
      email: this.addUserForm.get("email").value,
      phone: this.addUserForm.get("phone").value,
      password: this.addUserForm.get("password").value,
    };
    this.userService
      .addUser(user)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (data) => {
          this.initAddUserForm();
          setTimeout(() => this.gotoUsersList(), 2000);
        },
        (error) => console.log(error)
      );
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoUsersList() {
    this.router.navigate(["/usersList"]);
  }

  private initAddUserForm(): void {
    this.addUserForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [
        Validators.required,
        Validators.min(10000),
        Validators.max(10000000000),
      ]),
      password: new FormControl("", [
        Validators.required,
        CustomValidator.password,
      ]),
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
