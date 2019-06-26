import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Contact.MailingStreet',
    'Contact.MailingCity',
    'Contact.MailingState'
];

export default class LwcMap extends LightningElement {

    @api recordId;

    @track contact;
    @track mapMarkers;
    @track mapaVisible;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredContact({error, data}) {
        if (data) {
            this.contact = data;
            this.error = undefined;
            this.mapaVisible = true;
            this.mapMarkers = [
                {
                    location: {
                        Street: this.contact.fields.MailingStreet.value,
                        City: this.contact.fields.MailingCity.value,
                        State: this.contact.fields.MailingState.value,
                    }
                },
            ];    
            
        } else if (error) {
            this.error = error;
            this.contact = undefined;
            this.mapMarkers = undefined;
            this.mapaVisible = false;
        }
    }
}