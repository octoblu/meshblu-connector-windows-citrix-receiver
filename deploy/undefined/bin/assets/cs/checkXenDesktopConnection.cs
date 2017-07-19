using WfIcaLib;

public class Startup {
  public async Task<object> Invoke(dynamic ignored) {
    ICAClient ica = new ICAClient();
    var sessionsHandle = ica.EnumerateCCMSessions();
    var sessionsCount  = ica.GetEnumNameCount(sessionsHandle);
    ica.CloseEnumHandle(sessionsHandle);
    return (sessionsCount > 0);
  }
}
