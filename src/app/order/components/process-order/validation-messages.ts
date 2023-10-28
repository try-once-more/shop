import { Order } from "../../models/order.model";

type ValidationMessages = {
    [K in keyof Order]: {
        [key: string]: string;
    };
};

export const validationMessages: Partial<ValidationMessages> = {
    "firstName": {
        "required": "First Name is required.",
        "invalidUsername": "First Name must begin with a capital letter and be followed by one or more lowercase letters.",
    },
    "email": {
        "required": "Email is required.",
        "email": "Email must be valid."
    },
    "address": {
        "required": "Delivery address is required if delivery is selected.",
    },
};