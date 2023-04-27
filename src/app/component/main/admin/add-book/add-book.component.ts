import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SaveBookRequest} from "../../../../dto/book/save-book-request.dto";
import {AuthorPreview} from "../../../../dto/author/author-preview.dto";
import {Publisher} from "../../../../dto/publisher.dto";

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
    protected authors: AuthorPreview[] = []
    protected publishers: Publisher[] = []
    protected validateForm: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.validateForm = this.fb.group({
            title: ["", [Validators.required]],
            authorId: ["", [Validators.required]],
            publisherId: ["", [Validators.required]],
            publicationYear: ["", [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
            pageCount: ["", [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
            price: ["", [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)]]
        });
    }

    submitForm = () => {
        if (this.validateForm.valid) {
            const savingRequest: SaveBookRequest = this.validateForm.value;
            console.log(savingRequest)
        }
    };
}
