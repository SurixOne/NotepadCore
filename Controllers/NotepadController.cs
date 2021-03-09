using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Windows;
using webAPI.Models;
using webAPI.Models.Hubs;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotepadController : Controller
    {
        private const int SW_SHOW = 5;
        private IHubContext<NotepadHub> _hub;
        public NotepadController(IHubContext<NotepadHub> hub)
        {
            _hub = hub;
        }
        public IActionResult Get()
        {
            var prc = Process.Start("notepad.exe");
            prc.WaitForInputIdle();
            Notepad notepad = new Notepad(10, 100, 300, 200);
            bool ok = MoveWindow(prc.MainWindowHandle, notepad.x, notepad.y, notepad.width, notepad.height, false);
            if (!ok) throw new System.ComponentModel.Win32Exception();
            //SetForegroundWindow(prc.MainWindowHandle);
            var hWnd = prc.MainWindowHandle.ToInt32();
            ShowWindow(hWnd, SW_SHOW);
            _hub.Clients.All.SendAsync("transfernotepaddata", notepad);
            return Ok(new { Message = "Request Completed" });
        }
        [DllImport("User32")]
        private static extern int ShowWindow(int hwnd, int nCmdShow);
        [DllImport("user32")]
        private static extern bool SetForegroundWindow(IntPtr hwnd);
        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool MoveWindow(IntPtr hWnd, int x, int y, int width, int height, bool repaint);
    }
}
