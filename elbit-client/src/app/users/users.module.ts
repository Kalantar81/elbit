import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersContainerComponent } from "./users-container/users-container.component";
import { UserService } from "./services/user.service";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ViewUserComponent } from "./view-user/view-user.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UsersContainerComponent,
    AddUserComponent,
    EditUserComponent,
    ViewUserComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [UserService],
  exports: [UsersContainerComponent],
})
export class UsersModule {}
