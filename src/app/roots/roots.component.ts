import { Component, OnInit, Input } from '@angular/core';
import { Root } from './root.model';
import { Term } from '../terms/term.model';

@Component({
    moduleId: module.id,
    selector: 'my-app-roots',
    templateUrl: 'roots.component.html',
    styleUrls : ['roots.component.css']
})
export class RootsComponent implements OnInit {
    @Input() term:Term;
    roots : Root[];
    selectedRoot : Root;
    
    constructor() { }

    ngOnInit() { 
        this.roots = this.term.roots;
        
    }
   
     onSelect(root : Root){
        this.selectedRoot = root;
        
    }

}