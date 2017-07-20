using System;
using System.Threading.Tasks;
using WFICALib;

public class Startup {
  public async Task<object> Invoke(dynamic ignored) {
    System.Console.WriteLine("Invoke");
    ICAClientClass ica = new ICAClientClass();
    System.Console.WriteLine("new ICAClientClass");
    var sessionsHandle = ica.EnumerateCCMSessions();
    System.Console.WriteLine("EnumerateCCMSessions");
    var sessionsCount  = ica.GetEnumNameCount(sessionsHandle);
    System.Console.WriteLine("GetEnumNameCount");
    ica.CloseEnumHandle(sessionsHandle);
    System.Console.WriteLine("CloseEnumHandle");
    System.Console.WriteLine("sessionsCount");
    System.Console.WriteLine(sessionsCount);
    return (sessionsCount > 0);
  }
}
