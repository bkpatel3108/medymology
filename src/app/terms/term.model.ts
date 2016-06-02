/**
 * name
 */
import { Root } from '../roots/root.model';

export class Term {
    constructor() {
        
    }
    
    termId : number;
    termName : string;
    termDefinition : string;
    termInformation : string;
    termHistory : string;
    category : string;
    roots : Root[]    
}