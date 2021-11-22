using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using gateway.Models;
using Microsoft.AspNetCore.Authorization;

namespace gateway.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    static readonly HttpClient client = new HttpClient();

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [Authorize]
    [HttpGet("api/coins")]
    public async Task<string> GetAsync()
    {
        HttpResponseMessage response = await client.GetAsync("https://app.flowser.dev/api/projects");
        response.EnsureSuccessStatusCode();
        string responseBody = await response.Content.ReadAsStringAsync();
        return responseBody;
    }
}
