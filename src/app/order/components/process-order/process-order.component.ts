import { NgClass, NgIf } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { EmailValidationDirective } from "src/app/shared/directives/email-validation.directive";
import { usernameValidator } from "./username-validators";

@Component({
    selector: "app-process-order",
    standalone: true,
    templateUrl: "./process-order.component.html",
    imports: [ReactiveFormsModule, NgIf, NgClass, EmailValidationDirective]
})
export class ProcessOrderComponent implements OnInit {
    orderForm!: FormGroup;
    showDeliveryAddress = false;

    private readonly formBuilder = inject(FormBuilder);

    ngOnInit() {
        this.orderForm = this.formBuilder.group({
            firstName: ["", [Validators.required, usernameValidator]],
            lastName: [""],
            email: ["", [Validators.required]],
            phone: [""],
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

    submitOrder() {
        if (this.orderForm.valid) {
            //TODO: Add submit order
            console.log("Submitted!", this.orderForm.value);
        }
    }
}
