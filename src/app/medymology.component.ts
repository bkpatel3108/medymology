import { Component } from '@angular/core';
import { TermsComponent  } from './terms/terms.component'; 
import { HeaderComponent } from './header/header.component';
import { AddTermComponent } from './addterm/addterm.component';
import { Term } from './terms/term.model';

@Component({
  moduleId: module.id,
  selector: 'medymology-app',
  templateUrl: 'medymology.component.html',
  styleUrls: ['medymology.component.css'],
  directives : [TermsComponent,HeaderComponent,AddTermComponent]
})

export class MedymologyAppComponent {
    sharedTerms : Term[];
    newTerm : String;
    ngOnInit() {
          this.sharedTerms = [];
    }
    
    onNewTerm(newTerm : String)
    {
      this.newTerm = newTerm;
      console.log("MedymologyAppComponent-->"+this.newTerm);
    }
}
