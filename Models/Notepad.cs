using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class Notepad
    {
        public int x { get; set; }
        public int y { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public Notepad(int x1, int y2, int width2, int height2)
        {
            x = x1;
            y = y2;
            width = width2;
            height = height2;
        }
    }
}
