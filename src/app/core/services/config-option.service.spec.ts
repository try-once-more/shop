/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { ConfigOptionService } from "./config-option.service";

describe("Service: ConfigOption", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigOptionService]
    });
  });

  it("should ...", inject([ConfigOptionService], (service: ConfigOptionService) => {
    expect(service).toBeTruthy();
  }));
});
