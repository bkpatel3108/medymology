import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { Root } from '../roots/root.model';

@Component({
    moduleId: module.id,
    selector: 'my-app-newroot',
    templateUrl: 'addroot.component.html'
})
export class AddRootComponent implements OnInit {
    @Input() newRoot: String;
    root : Root;
    
    rootFormError: { [id: string]: string };
    private _validationMessages: { [id: string]: { [id: string]: string } };
    editRootForm: ControlGroup;
    rootNameControl: Control;
    rootDefinitionControl: Control;
    rootLanguageControl: Control;
    
    ngOnInit() {
        this.root = new Root();

        this.rootNameControl = new Control(this.root.rootName, Validators.compose([Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25)]));
        
        this.rootDefinitionControl = new Control(this.root.rootDefinition, Validators.compose([Validators.required,
            Validators.minLength(5),
            Validators.maxLength(1000)]));
            
        this.rootLanguageControl = new Control(this.root.rootLanguage, Validators.compose([Validators.required,
            Validators.minLength(2),
            Validators.maxLength(25)]));

        this.editRootForm = this._fb.group({
            'rootName': this.rootNameControl,
            'rootDefinition': this.rootDefinitionControl,
            'rootLanguage': this.rootLanguageControl,
        });

        this.editRootForm.valueChanges.subscribe(data => this.onValueChanged(data));
 
    }
    
    constructor(myElement: ElementRef, private _fb: FormBuilder) {

        this.rootFormError = {
            'rootName': '',
            'rootDefinition': '',
            'rootLanguage': ''
        };

        this._validationMessages = {
            'rootName': {
                'required': 'root name is required',
                'minlength': 'root name must be at least 2 characters.',
                'maxlength': 'root name cannot exceed 25 characters.'
            },
            'rootDefinition': {
                'required': 'root definition is required',
                'minlength': 'root definition must be at least 5 characters.',
                'maxlength': 'root definition cannot exceed 1000 characters.'
            },
            'rootLanguage': {
                'required': 'root language is required',
                'minlength': 'root language must be at least 2 characters.',
                'maxlength': 'root language cannot exceed 25 characters.'
            }
        };
    }
    
    
    onValueChanged(data: any) {
        for (let field in this.rootFormError) {
            if (this.rootFormError.hasOwnProperty(field)) {
                let hasError = this.editRootForm.controls[field].dirty &&
                    !this.editRootForm.controls[field].valid;
                this.rootFormError[field] = '';
                if (hasError) {
                    for (let key in this.editRootForm.controls[field].errors) {
                        if (this.editRootForm.controls[field].errors.hasOwnProperty(key)) {
                            this.rootFormError[field] += this._validationMessages[field][key] + ' ';
                        }
                    }
                }
            }
        }
    }
    
    saveNewRoot() {
        if (this.editRootForm.dirty && this.editRootForm.valid) {
            this.editRootForm = this.editRootForm.value;
            alert(`Root: ${JSON.stringify(this.root)}`);
        }
    }
}