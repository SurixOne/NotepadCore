import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as signalR from "@aspnet/signalr";


@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  public notepad;
  public width;
  public height;
  public x;
  public y;
  private hubConnection: signalR.HubConnection;
  public isOpen: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.isOpen = true;
    this.startConnection();
    this.addTransferNotepadDataListener();
    this.startHttpRequest();
  }
  public closeNotepad(){
    this.hubConnection.invoke("CloseNotepad");
    this.isOpen = false;
  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5001/notepad')
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');

      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addTransferNotepadDataListener = () => {
    this.hubConnection.on('transferwindowsize', (data) => {
      //this.serverWidth = data[0];
      //this.serverHeight = data[1];
    });
    this.hubConnection.on('transfernotepaddata', (data) => {
      this.notepad = data;
    });
  }
  private startHttpRequest = () => {
    this.http.get('http://localhost:5001/api/notepad')
      .subscribe(res => {
        console.log(res);
      })
  }
  public onWidthChange(e) {
    this.notepad.width = e;
    this.hubConnection.invoke("SendMessage", this.notepad.x, this.notepad.y, e, this.notepad.height);
  }
  public onHeightChange(e) {
    this.notepad.height = e;
    this.hubConnection.invoke("SendMessage", this.notepad.x, this.notepad.y, this.notepad.width, e);
  }
  public onXChange(e) {
    this.notepad.x = e;
    this.hubConnection.invoke("SendMessage", e, this.notepad.y, this.notepad.width, this.notepad.height);
  }
  public onYChange(e) {
    this.notepad.y = e;
    this.hubConnection.invoke("SendMessage", this.notepad.x, e, this.notepad.width, this.notepad.height);
  }
  public reload(){
    window.location.reload();
  }
}
