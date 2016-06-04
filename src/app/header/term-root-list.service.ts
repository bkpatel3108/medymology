import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TermRootListService {

    constructor(private http : Http) { }
    
    getTerms(word:String){
        // return [
        //   {'id' : 11, 'name' : 'Bhaumik' },
        //   {'id' : 12, 'name' : 'Dev' },
        //   {'id' : 13, 'name' : 'Manu' }            
        // ];
        return this.http.get('http://localhost:8888/php-rest-services/autocomplete.php')
            .map((res: Response) => res.json());
    }
}