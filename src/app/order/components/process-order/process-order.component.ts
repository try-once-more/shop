import { NgClass, NgIf } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: "app-process-order",
    standalone: true,
    templateUrl: "./process-order.component.html",
    imports: [ReactiveFormsModule, NgIf, NgClass]
})
export class ProcessOrderComponent implements OnInit {
    orderForm!: FormGroup;
    showDeliveryAddress = false;

    private readonly formBuilder = inject(FormBuilder);

    ngOnInit() {
        const upperCasePattern = /^\p{Lu}/u; //Any uppercase Unicode letter as the first character.
        this.orderForm = this.formBuilder.group({
            firstName: ["", [Validators.required, Validators.pattern(upperCasePattern)]],
            lastName: [""],
            email: ["", [Validators.required, Validators.email]],
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
