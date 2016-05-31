import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app-newterm',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: 'addterm.component.html'
})
export class AddTermComponent implements OnInit {
    @Input() newTerm : String;
    @Input()rootName : String;
    roots : String[];
    newTermRoots : String[];
    filteredList : String[] = [];
    expandNewTerm : boolean;
    expandAddRoots : boolean;
    public elementRef: ElementRef;

    constructor(myElement: ElementRef) { 
        this.elementRef = myElement;
    }

    ngOnInit() { 
        //this.newTerm = '';
        this.newTermRoots = [];
        this.roots = ["aazz","bbyy","ccxx","ddww"];
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
    
    removeNewTermRoot(rootName : String)
    {
        this.newTermRoots.splice(this.newTermRoots.indexOf(rootName),1);
    }

}