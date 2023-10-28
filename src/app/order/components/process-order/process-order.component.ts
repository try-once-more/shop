import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { EmailValidationDirective } from "src/app/shared/directives/email-validation.directive";
import { usernameValidator } from "./username-validators";
import { validationMessages } from "./validation-messages";
import { Order } from "../../models/order.model";
import { ModelFormGroup } from "src/app/shared/model-form-group.type";

@Component({
    selector: "app-process-order",
    standalone: true,
    templateUrl: "./process-order.component.html",
    imports: [ReactiveFormsModule, NgIf, NgForOf, NgClass, EmailValidationDirective]
})
export class ProcessOrderComponent implements OnInit {
    orderForm!: ModelFormGroup<Order>;

    ngOnInit(): void {
        this.orderForm = new FormGroup({
            firstName: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required, usernameValidator]
            }),
            lastName: new FormControl("", { nonNullable: true }),
            email: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required]
            }),
            phoneNumbers: new FormArray([new FormControl("", { nonNullable: true })]),
            delivery: new FormControl(false, { nonNullable: true }),
            address: new FormControl("", { nonNullable: true }),
        });

        this.orderForm.controls.delivery.valueChanges.subscribe(delivery => {
            const addressControl = this.orderForm.controls.address;
            if (delivery) {
                addressControl.setValidators([Validators.required]);
            } else {
                addressControl.clearValidators();
                addressControl.setValue("");
            }
        });
    }

    getErrorMessage(controlName: keyof typeof validationMessages): string | null {
        const control = this.orderForm.controls[controlName];
        const errors = control.errors;
        const messages = validationMessages[controlName];

        return control.invalid && errors && messages
            ? Object.keys(errors).map(errorKey => messages[errorKey]).join("; ")
            : null;
    }

    addPhone(): void {
        const phoneControl = new FormControl("", { nonNullable: true });
        this.orderForm.controls.phoneNumbers.push(phoneControl);
    }

    removePhone(index: number): void {
        this.orderForm.controls.phoneNumbers.removeAt(index);
    }

    submitOrder(): void {
        if (this.orderForm.valid) {
            //TODO: Add submit order
            console.log("Submitted!", this.orderForm.value);
        }
    }
}
