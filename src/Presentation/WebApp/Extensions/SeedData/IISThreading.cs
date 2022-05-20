using System.Timers;

namespace Temple.WebApp.Extensions.SeedData;

public static class IISThreading
{
    static string path = string.Empty;
    static string host = "https://Temple.xploring.me/";
    static long loopCount = 0;
    
    public static void PreventIisToSleep(this IApplicationBuilder _, IWebHostEnvironment environment)
    {
        string folder = string.Format("{0}\\{1}\\", Environment.CurrentDirectory, "Logs\\Timer");
        if (!environment.IsProduction())
        {
            return;
        }
        if (!Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }
        path = string.Format("{0}\\{1}", folder, $"{DateTime.UtcNow.AddHours(5).AddMinutes(30):dd-MMM-yyyy}.txt");
        string text = $"{loopCount} :- IISThreading successfully registered at {DateTime.UtcNow.AddHours(5).AddMinutes(30)}";
        if (File.Exists(path))
            File.AppendAllText(path, $"\n{text}"); 
        else 
            File.AppendAllText(path, text);

        System.Timers.Timer timer = new()
        {
            Enabled  = true,
            Interval = 1000 * 60 * 4
        };
        timer.Elapsed += Timer_Elapsed;
        timer.Start();
    }
  
    private static async void Timer_Elapsed(object? sender, ElapsedEventArgs? e)
    {
        try
        {
            loopCount++;
            HttpClient httpClient = new()
            {
                BaseAddress = new Uri(host)
            };
            var result = await httpClient.GetAsync("");
            if (result.StatusCode == HttpStatusCode.OK)
            {
                File.AppendAllText(path, $"\n{loopCount} :- ${host} is called successfully at {DateTime.UtcNow.AddHours(5).AddMinutes(30)}");
            }
            else
            {
                File.AppendAllText(path, $"\n{loopCount} :- ${host} failed to call at {DateTime.UtcNow.AddHours(5).AddMinutes(30)}");
            }
        }
        finally { }
    }
}
