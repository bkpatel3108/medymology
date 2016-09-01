import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { Term } from '../terms/term.model';
import { RootService } from '../roots/root.service';
import { AddTermService } from './addterm.service';

@Component({
    moduleId: module.id,
    selector: 'my-app-newterm',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: 'addterm.component.html',
    providers: [RootService,AddTermService]

})
export class AddTermComponent implements OnInit {
    @Input() newTerm: String;
    @Input() rootName: String;

    roots: String[] = [];
    newTermRoots: String[];
    filteredList: String[] = [];
    //expandNewTerm: boolean;
    expandAddRoots: boolean;
    public elementRef: ElementRef;

    term: Term;
    formError: { [id: string]: string };
    private _validationMessages: { [id: string]: { [id: string]: string } };
    editForm: ControlGroup;
    termNameControl: Control;
    termDefinitionControl: Control;
    termInformationControl: Control;

    constructor(myElement: ElementRef, private _fb: FormBuilder, private rootService: RootService, private addTermService : AddTermService) {
        this.elementRef = myElement;

        this.formError = {
            'termName': '',
            'termDefinition': '',
            'termInformation': ''
        };

        this._validationMessages = {
            'termName': {
                'required': 'term name is required',
                'minlength': 'term name must be at least two characters.',
                'maxlength': 'term name cannot exceed 25 characters.'
            },
            'termDefinition': {
                'required': 'term definition is required',
                'minlength': 'term definition must be at least 5 characters.',
                'maxlength': 'term definition cannot exceed 1000 characters.'
            },
            'termInformation': {
                'required': 'term information is required',
                'minlength': 'term information must be at least 5 characters.',
                'maxlength': 'term information cannot exceed 1000 characters.'
            }
        };
    }

    ngOnInit() {
        //this.newTerm = '';
        this.newTermRoots = [];
        //this.roots = ["aazz", "bbyy", "ccxx", "ddww"];
        this.rootService.getRoots("temp")
            .subscribe(roots => {
                //this.terms = terms.data.terms
                console.log("roots-->" + roots);

                if (roots.data.roots) {

                    for (var root of roots.data.roots) {
                        console.log("roots-->" + root.rootName);
                        this.roots.push(root.rootName);
                        console.log("roots-->" + this.roots);
                    }
                }
            });;

        this.term = new Term();

        this.termNameControl = new Control(this.term.termName, Validators.compose([Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]));

        this.termDefinitionControl = new Control(this.term.termDefinition, Validators.compose([Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]));

        this.termInformationControl = new Control(this.term.termInformation, Validators.compose([Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]));

        this.editForm = this._fb.group({
            'termName': this.termNameControl,
            'category': [this.term.category],
            'termDefinition': this.termDefinitionControl,
            'termInformation': this.termInformationControl,
            'termHistory': [this.term.termHistory]
        });

        this.editForm.valueChanges.subscribe(data => this.onValueChanged(data));
        // th
        console.log("roots-->" + this.roots);

    }

    onValueChanged(data: any) {
        for (let field in this.formError) {
            if (this.formError.hasOwnProperty(field)) {
                let hasError = this.editForm.controls[field].dirty &&
                    !this.editForm.controls[field].valid;
                this.formError[field] = '';
                if (hasError) {
                    for (let key in this.editForm.controls[field].errors) {
                        if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
                            this.formError[field] += this._validationMessages[field][key] + ' ';
                        }
                    }
                }
            }
        }
    }

    saveNewTerm() {
        if (this.editForm.dirty && this.editForm.valid) {
            this.term = this.editForm.value;
            alert(`Movie: ${JSON.stringify(this.term)}`);
            this.addTermService.addTerm(this.editForm.value);
        }
    }

    filter() {
        if (this.rootName !== "") {
            this.filteredList = this.roots.filter(function (el) {
                return el.toLowerCase().indexOf(this.rootName.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.rootName = item;
        this.filteredList = [];
        this.newTermRoots.push(this.rootName);
        //this.onSearch(this.rootName);
    }

    handleClick(event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    }

    removeNewTermRoot(rootName: String) {
        this.newTermRoots.splice(this.newTermRoots.indexOf(rootName), 1);
    }

}