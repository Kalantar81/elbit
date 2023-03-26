import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CustomValidator } from "../custom-validators/custom-validator";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.less"],
})
export class EditUserComponent implements OnInit, OnDestroy {
  id: string;
  editUserForm: FormGroup;

  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initEditUserForm();
    this.id = this.route.snapshot.params["id"];

    this.userService.getUserById(this.id).subscribe(
      (user: User) => {
        this.updateEditUserForm(user);
      },
      (error) => console.log(error)
    );
  }

  updateEmployee() {
    const user: User = {
      _id: this.id,
      name: this.editUserForm.get("name").value,
      email: this.editUserForm.get("email").value,
      phone: this.editUserForm.get("phone").value,
      password: this.editUserForm.get("password").value,
    };
    this.userService
      .updateUser(user)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (data) => {
          this.initEditUserForm();
          this.gotoUsersList();
        },
        (error) => console.log(error)
      );
  }

  onSubmit() {
    this.updateEmployee();
  }

  gotoUsersList() {
    this.router.navigate(["/usersList"]);
  }

  private updateEditUserForm(user: User): void {
    this.editUserForm.setValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });
  }

  private initEditUserForm(): void {
    this.editUserForm = new FormGroup({
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
