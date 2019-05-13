import { LightningElement, api, track } from 'lwc';
import uId from '@salesforce/user/Id';
import userHasEncryptedData from '@salesforce/apex/UserUtils.userHasEncryptedData';

export default class ContactForm extends LightningElement {
    @api recordId;
    @track viewEncryptedData;
    @track error;
    @track showSpinner = true;
    @track ePin;
    userId = uId;

    constructor() {
        super();
        userHasEncryptedData({userId: this.userId})
            .then(result => {
                this.viewEncryptedData = result;
            })
            .catch(error => {
                this.error = error;
            });
    }

    handlePinBlur(event) {
        this.ePin = event.target.value;
    }

    handleLoad(event) {
        this.showSpinner= false;
        console.log(this.viewEncryptedData,this.ePin, event.detail.records[this.recordId].fields.e_Pin__c.value );
        if (!this.ePin) {
            const ePinActual = event.detail.records[this.recordId].fields.e_Pin__c.value;
            this.ePin = this.viewEncryptedData ?
                            ePinActual : ePinActual.replace(/./gi, '*');    
        }
    }

    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        console.log('handleSubmit', this.ePin, fields.e_Pin__c);
        fields.e_Pin__c = this.ePin;
        this.template.querySelector('lightning-record-edit-form').submit(fields);        
    }

    handleSuccess(event){
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
        this.dispatchEvent(new CustomEvent('cerrarquickaction'));        
    }
}