import {CheckoutStatus} from "../../core/constant/checkout-status.enum";

export interface CheckoutUpdateRequest {
    id: number;
    issueDate: Date;
    returnDate: Date;
    status: CheckoutStatus;
}
