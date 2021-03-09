# NotepadCore
App to open, resize, move and close notepad from client to server side using realtime SignalR Websockets with NetCore and Angular

# Steps: 

On the desired folder, clone the repo by doing

    git clone https://github.com/SurixOne/NotepadCore.git

then, open a cmd from the NotepadCore folder and type the command

    dotnet run

finally, open a terminal on the angular-client folder and run the following commands

    npm install

(wait until dependencies get installed)

    ng serve

make sure to go to the desktop and get a half-opened chrome tab on the right of your screen (so you can see the notepad). Once the ng serve finishes, go to localhost:4200.

The app opens a notepad by sending a get request, and then you can move, resize or close the notepad window using the sliders and the close button.

Tasks are sent in real time with websockets by using signalR Hubs.

Once you close the notepad using the client's close button, you will see the reload file button. Press it to reload the page and Start again!
