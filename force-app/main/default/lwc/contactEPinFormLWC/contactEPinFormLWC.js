import { LightningElement, api, track } from 'lwc';

import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import E_PIN from '@salesforce/schema/Contact.e_Pin__c';
import BIRTHDATE from '@salesforce/schema/Contact.Birthdate';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class ContactEPinFormLWC extends LightningElement {
    @api recordId; 
    @track error;
    @track stack;
    @track showSpinner = true;
    @track ePin;

    fields = [FIRST_NAME, LAST_NAME, E_PIN, BIRTHDATE];

    handlePinBlur(event) {
        this.ePin = event.target.value;
    }

    handleLoad(event) {
        this.showSpinner= false;
        if (!this.ePin) {
            this.ePin = event.detail.records[this.recordId].fields.e_Pin__c.value;
        }
    }

    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.e_Pin__c = this.ePin;
        this.template.querySelector('lightning-record-edit-form').submit(fields);        
    }

    handleSuccess(event){
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
        this.dispatchEvent(new CustomEvent('cerrarquickaction'));      
        const ev = new ShowToastEvent({
            title: 'Success!',
            message: 'Record Updated Succesfully!',
            variant: 'success'
        }); 
        this.dispatchEvent(ev);          
    }

    errorCallback(error, stack) {
        this.error = error;
        console.error('Error: ', error);
        console.error('Stack: ', stack);
    }
}