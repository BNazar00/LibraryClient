import {Component} from '@angular/core';
import {ActivityType} from "../../../../dto/activity-type.dto";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SaveReaderTicketRequest} from "../../../../dto/reader-ticket/save-reader-ticket-request.dto";

@Component({
    selector: 'app-create-reader-ticket',
    templateUrl: './form-reader-ticket.component.html',
    styleUrls: ['./form-reader-ticket.component.scss']
})
export class FormReaderTicketComponent {
    protected validateForm: UntypedFormGroup;
    protected activityTypes: ActivityType[] = [
        {id: 1, name: "test"},
        {id: 2, name: "test2"}
    ]

    constructor(private fb: UntypedFormBuilder) {
        this.validateForm = this.fb.group({
            address: ["", [Validators.required]],
            activityTypeId: ["", [Validators.required]],
            phoneNumber: ["", [Validators.required]]
        });
    }

    submitForm = () => {
        const savingRequest: SaveReaderTicketRequest = this.validateForm.value;
        console.log(savingRequest)
    };
}
