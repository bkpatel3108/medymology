import { Component, EventEmitter, OnInit, Input, Output, ElementRef } from '@angular/core';
import { TermService } from '../terms/term.service';
import { Term } from '../terms/term.model';
import { TermRootListService } from './term-root-list.service';


@Component({
    moduleId: module.id,
    selector: 'my-app-header',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: 'header.component.html',
    providers: [TermService, TermRootListService]
})

export class HeaderComponent implements OnInit {
    @Input() word: String;
    @Input() terms: Term[];
    
    @Output() onNewWord = new EventEmitter<String>();

    words: String[] = [];
    //terms: Term[];
    term: Term;
    public elementRef: ElementRef;
    public filteredList = [];


    constructor(private termService: TermService, private termRootListService: TermRootListService, myElement: ElementRef) {
        this.elementRef = myElement;
    }

    ngOnInit() {
        this.termRootListService.getTerms("temp")
            .subscribe(words => {
                //this.terms = terms.data.terms
                for (var word of words) {
                    this.words.push(word);
                }
            });;
    }
    

    onSearch(word: String) {
        this.terms.splice(0, this.terms.length);
        console.log("Word-->" + word);
        console.log("terms-->" + this.terms);
        this.termService.getTerms(word)
            .subscribe(terms => {
                //this.terms = terms.data.terms
                if (terms.data.terms) {
                    for (var term of terms.data.terms) {
                        this.terms.push(term);
                    }
                }
                else{
                    console.log("newWord-->" + word);
                    this.onNewWord.emit(word);
                }
            });
        // this.term = new Term();
        // this.term.termId = 1;
        // this.term.termName = "Bhaumik";
        // this.terms.push(this.term);
        console.log("HeaderComponent-->terms-->" + this.terms);
    }


    // public countries = [ "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia & Herzegovina",
    //                     "Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia",
    //                     "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo","Latvia","Liechtenstein",
    //                     "Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","Netherlands",
    //                     "Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia",
    //                     "Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];


    filter() {
        if (this.word !== "") {
            this.filteredList = this.words.filter(function (el) {
                return el.toLowerCase().indexOf(this.word.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.word = item;
        this.filteredList = [];
        this.onSearch(this.word);
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
}