/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { ProcessOrderComponent } from "./process-order.component";

describe("ProcessOrderComponent", () => {
    let component: ProcessOrderComponent;
    let fixture: ComponentFixture<ProcessOrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProcessOrderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
