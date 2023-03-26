import { FormControl } from "@angular/forms";

export class CustomValidator {
  static password(control: FormControl): { [key: string]: boolean } {
    if (control.value.length < 2) {
      return { password: true };
    }
    const value = control.value.match(/\d/g);
    if (!value || value.length < 2) {
      return { password: true };
    }
    return null;
  }
}
