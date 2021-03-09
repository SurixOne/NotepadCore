import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as signalR from "@aspnet/signalr";
let NotepadComponent = class NotepadComponent {
    constructor(http) {
        this.http = http;
        this.isOpen = false;
        this.startConnection = () => {
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl('http://localhost:5001/notepad')
                .build();
            this.hubConnection
                .start()
                .then(() => {
                console.log('Connection started');
            })
                .catch(err => console.log('Error while starting connection: ' + err));
        };
        this.addTransferNotepadDataListener = () => {
            this.hubConnection.on('transferwindowsize', (data) => {
                //this.serverWidth = data[0];
                //this.serverHeight = data[1];
            });
            this.hubConnection.on('transfernotepaddata', (data) => {
                this.notepad = data;
            });
        };
        this.startHttpRequest = () => {
            this.http.get('http://localhost:5001/api/notepad')
                .subscribe(res => {
                console.log(res);
            });
        };
    }
    ngOnInit() {
        this.isOpen = true;
        this.startConnection();
        this.addTransferNotepadDataListener();
        this.startHttpRequest();
    }
    closeNotepad() {
        this.hubConnection.invoke("CloseNotepad");
        this.isOpen = false;
    }
    onWidthChange(e) {
        this.notepad.width = e;
        this.hubConnection.invoke("SendMessage", this.notepad.x, this.notepad.y, e, this.notepad.height);
    }
    onHeightChange(e) {
        this.notepad.height = e;
        this.hubConnection.invoke("SendMessage", this.notepad.x, this.notepad.y, this.notepad.width, e);
    }
    onXChange(e) {
        this.notepad.x = e;
        this.hubConnection.invoke("SendMessage", e, this.notepad.y, this.notepad.width, this.notepad.height);
    }
    onYChange(e) {
        this.notepad.y = e;
        this.hubConnection.invoke("SendMessage", this.notepad.x, e, this.notepad.width, this.notepad.height);
    }
    reload() {
        window.location.reload();
    }
};
NotepadComponent = __decorate([
    Component({
        selector: 'app-notepad',
        templateUrl: './notepad.component.html',
        styleUrls: ['./notepad.component.scss']
    })
], NotepadComponent);
export { NotepadComponent };
//# sourceMappingURL=notepad.component.js.map