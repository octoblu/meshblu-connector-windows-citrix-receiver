using WFICALib;

public class Startup {
  public async Task<object> Invoke(dynamic ignored) {
    ICAClientClass ica = new ICAClientClass();
    var sessionsHandle = ica.EnumerateCCMSessions();
    var sessionsCount  = ica.GetEnumNameCount(sessionsHandle);
    ica.CloseEnumHandle(sessionsHandle);
    return (sessionsCount > 0);
  }
}
