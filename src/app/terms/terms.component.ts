import { Component, OnInit, Input } from '@angular/core';
import { Term } from './term.model';
import { RootsComponent } from '../roots/roots.component';
import { TermService } from './term.service';

@Component({
    moduleId: module.id,
    selector: 'my-app-terms',
    templateUrl: 'terms.component.html',
    styleUrls : ['terms.component.css'],
    directives : [RootsComponent],
    providers : [TermService]
})
export class TermsComponent implements OnInit {
    @Input() terms: Term[];
    selectedTerm : Term;
    
    constructor(private termService : TermService) { }
    
    ngOnInit() { 
        // this.termService.getTerms()
        //     .subscribe(terms => this.terms = terms.data.terms);
                
    }

    onSelect(term : Term){
        this.selectedTerm = term;
        
    }
    
    
}