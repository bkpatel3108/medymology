import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AddTermService{
    constructor(private http : Http) { }

    ngOnInit() { }

     addTerm(word:String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let wordStr = 'word='+word;

        this.http.post('http://localhost:8888/php-rest-services/addTerm.php', wordStr, {
        headers: headers
        }).subscribe(res => {
            console.log('post result %o', res);
        });
    }
}