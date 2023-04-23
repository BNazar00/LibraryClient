import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SaveBookRequest} from "../../../../dto/book/save-book-request.dto";

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
    protected validateForm: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.validateForm = this.fb.group({
            title: ["", [Validators.required]],
            publicationYear: ["", [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+$")]],
            pageCount: ["", [Validators.required, Validators.min(1)]],
            price: ["", [Validators.required, Validators.min(0)]]
        });
    }

    submitForm = () => {
        if (this.validateForm.valid) {
            const savingRequest: SaveBookRequest = this.validateForm.value;
            console.log(savingRequest)
        }
    };
}
