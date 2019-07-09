import { LightningElement, track } from 'lwc';
import methodNameA from '@salesforce/apex/ClassA.methodName';
import methodNameB from '@salesforce/apex/ClassB.methodName';

export default class LwcMultipleApex extends LightningElement {
    @track stringA;
    @track stringB;
    @track error;

    connectedCallback() {
        methodNameA()
            .then(result => {
                this.stringA = result;
            })
            .catch(error => {
                this.error = error;
                console.error('ERROR: ', this.error);
            });   

        methodNameB()
            .then(result => {
                this.stringB = result;
            })
            .catch(error => {
                this.error = error;
            });               
    }
}