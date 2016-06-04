import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TermService {

    constructor(private http : Http) { }
    
    getTerms(word:String){
        // return [
        //   {'id' : 11, 'name' : 'Bhaumik' },
        //   {'id' : 12, 'name' : 'Dev' },
        //   {'id' : 13, 'name' : 'Manu' }            
        // ];
        return this.http.get('http://localhost:8888/php-rest-services/searchTermRoot.php?word='+word)
            .map((res: Response) => res.json());
    }
}