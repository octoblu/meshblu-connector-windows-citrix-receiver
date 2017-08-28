using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Management;

public class Startup {
  public async Task<object> Invoke(dynamic ignored){
    Process[] processlist = Process.GetProcessesByName("wfica32");
    if(processlist == null || processlist.Length == 0) return 0;
    return processlist.Length;
  }
}
