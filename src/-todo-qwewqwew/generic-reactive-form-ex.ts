import {FormBuilder, FormGroup, AbstractControl, FormControl, FormArray} from "@angular/forms";

// TODO: qwewqwew: add static validateAllFormFieldsInFormGroup to GRF and make those other guys static too!!!
export class GenericReactiveFormEx {

  static validateAllFormFieldsInFormGroup(formGroup: FormGroup) {
    this.validateAllFormFields_recursive(formGroup);
  }

  private static validateAllFormFields_recursive(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields_recursive(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields_recursiveArray(control as FormArray);
      }
    });
  }
  private static validateAllFormFields_recursiveArray(formArr: FormArray) {
    formArr.controls.forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields_recursive(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields_recursiveArray(control as FormArray);
      }
    });
  }
}