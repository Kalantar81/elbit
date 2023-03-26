import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddUserComponent } from "./users/add-user/add-user.component";
import { EditUserComponent } from "./users/edit-user/edit-user.component";
import { UsersContainerComponent } from "./users/users-container/users-container.component";
import { ViewUserComponent } from "./users/view-user/view-user.component";

const routes: Routes = [
  { path: "", redirectTo: "usersList", pathMatch: "full" },
  { path: "usersList", component: UsersContainerComponent },
  { path: "viewUser/:id", component: ViewUserComponent },
  { path: "addUser", component: AddUserComponent },
  { path: "updateUser/:id", component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
