import { Component } from '@angular/core';
import { TermsComponent  } from './terms/terms.component'; 
import { HeaderComponent } from './header/header.component';
import { AddWordComponent } from './addword/addword.component';
import { Term } from './terms/term.model';

@Component({
  moduleId: module.id,
  selector: 'medymology-app',
  templateUrl: 'medymology.component.html',
  styleUrls: ['medymology.component.css'],
  directives : [TermsComponent,HeaderComponent,AddWordComponent]
})

export class MedymologyAppComponent {
    sharedTerms : Term[];
    newWord : String;
    ngOnInit() {
          this.sharedTerms = [];
    }
    
    onNewWord(newWord : String)
    {
      this.newWord = newWord;
      console.log("MedymologyAppComponent-->"+this.newWord);
    }
}
