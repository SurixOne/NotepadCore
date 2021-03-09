using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace webAPI.Models.Hubs
{
    public class NotepadHub : Hub
    {
        public void ModifyNotepad(int x, int y, int width, int height)
        {
            var prcs = Process.GetProcessesByName("notepad"); 
            var prc = prcs[prcs.Length-1];
                prc.WaitForInputIdle();
                bool ok = MoveWindow(prc.MainWindowHandle, x, y, width, height, false);
                if (!ok) throw new System.ComponentModel.Win32Exception();
        }
        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool MoveWindow(IntPtr hWnd, int x, int y, int width, int height, bool repaint);

        public Task SendMessage(int x, int y, int width, int height)
        {
            ModifyNotepad(x, y, width, height);
            return Clients.All.SendAsync("ReceiveMessage", x);
        }
        public Task CloseNotepad(){          
            var prcs = Process.GetProcessesByName("notepad"); 
            var prc = prcs[prcs.Length-1];
                prc.WaitForInputIdle();
            prc.Kill();
            return Clients.All.SendAsync("Closed");
        }
    }
}
