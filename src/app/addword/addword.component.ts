import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { AddTermComponent } from '../addterm/addterm.component';
import { AddRootComponent } from '../addroot/addroot.component';

@Component({
    moduleId: module.id,
    selector: 'my-app-newword',
    templateUrl: 'addword.component.html',
    directives : [AddTermComponent,AddRootComponent]
    
})
export class AddWordComponent implements OnInit {
    
    @Input() newWord: String;
    expandNewTerm : boolean;
    expandNewRoot : boolean;
    
    ngOnInit() {
        
    }
}