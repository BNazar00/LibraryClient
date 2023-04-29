import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SaveBookRequest} from "../../../../dto/book/save-book-request.dto";
import {AuthorPreview} from "../../../../dto/author/author-preview.dto";
import {Publisher} from "../../../../dto/publisher.dto";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {BASE_URL} from "../../../../core/constant/constants";
import {NzShowUploadList} from "ng-zorro-antd/upload/interface";
import {Observable} from "rxjs";
import {FileService} from "../../../../service/file.service";

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
    protected authors: AuthorPreview[] = []
    protected publishers: Publisher[] = []
    protected validateForm: UntypedFormGroup;

    protected fileList: NzUploadFile[] = [];
    protected readonly BASE_URL = BASE_URL;
    protected previewImage: string | undefined = "";
    protected previewVisible = false;
    protected uploadConfig: NzShowUploadList = {
        showRemoveIcon: true,
        showPreviewIcon: true,
        showDownloadIcon: false
    }

    constructor(private fb: UntypedFormBuilder,
                private fileService: FileService) {
        this.validateForm = this.fb.group({
            title: ["", [Validators.required]],
            authorId: ["", [Validators.required]],
            coverUrl: ["", [Validators.required]],
            publisherId: ["", [Validators.required]],
            publicationYear: ["", [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
            pageCount: ["", [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
            price: ["", [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)]]
        });
    }

    protected onImageDelete = (item: NzUploadFile): Observable<boolean> => {
        return this.fileService.deleteImage(item.response.name);
    };

    protected handleChange = (item: NzUploadChangeParam) => {
        if (item.type === "success") {
            this.validateForm.get("coverUrl")?.setValue(item.file.response.name)
        }
    };

    protected handlePreview = async (file: NzUploadFile): Promise<void> => {
        if (!file.url && !file['preview']) {
            file['preview'] = await this.getBase64(file.originFileObj!);
        }
        this.previewImage = file.url || file['preview'];
        this.previewVisible = true;
    };

    protected submitForm = () => {
        if (this.validateForm.valid) {
            const savingRequest: SaveBookRequest = this.validateForm.value;
            console.log(savingRequest);
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
            if (!this.validateForm.controls["coverUrl"].valid) {
                const uploadElement = document.querySelector('.ant-upload.ant-upload-select.ant-upload-select-picture-card.ng-star-inserted') as HTMLElement;
                uploadElement.style.border = '1px dashed #a61d24';
                const child = document.querySelector('.ng-star-inserted') as HTMLElement;
                child.style.color = '#434343';
                console.error("invalid data")
            }
        }
    }

    private getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
}
