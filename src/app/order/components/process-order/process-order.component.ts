import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { EmailValidationDirective } from "src/app/shared/directives/email-validation.directive";
import { usernameValidator } from "./username-validators";

@Component({
    selector: "app-process-order",
    standalone: true,
    templateUrl: "./process-order.component.html",
    imports: [ReactiveFormsModule, NgIf, NgForOf, NgClass, EmailValidationDirective]
})
export class ProcessOrderComponent implements OnInit {
    orderForm!: FormGroup;
    showDeliveryAddress = false;

    private readonly formBuilder = inject(FormBuilder);

    get phoneNumbers(): FormArray {
        return this.orderForm.get("phoneNumbers") as FormArray;
    }

    ngOnInit() {
        this.orderForm = this.formBuilder.group({
            firstName: ["", [Validators.required, usernameValidator]],
            lastName: [""],
            email: ["", [Validators.required]],
            phoneNumbers: this.formBuilder.array([
                this.formBuilder.control("")
            ]),
            delivery: [this.showDeliveryAddress],
            address: [""]
        });
    }

    toggleDelivery() {
        this.showDeliveryAddress = !this.showDeliveryAddress;

        if (!this.showDeliveryAddress) {
            this.orderForm.value.address.clearValidators();
            this.orderForm.value.address.setValue("");
        } else {
            this.orderForm.value.address.setValidators([Validators.required]);
        }
    }

    addPhone(): void {
        const phoneControl = this.formBuilder.control("");
        this.phoneNumbers.push(phoneControl);
    }

    removePhone(index: number): void {
        this.phoneNumbers.removeAt(index);
    }

    submitOrder() {
        if (this.orderForm.valid) {
            //TODO: Add submit order
            console.log("Submitted!", this.orderForm.value);
        }
    }
}
