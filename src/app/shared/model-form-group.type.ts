import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type ModelFormGroup<T> = FormGroup<{
    [K in keyof T]: T[K] extends Array<infer V>
    ? FormArray<FormControl<V>>
    : FormControl<T[K]>;
}>;