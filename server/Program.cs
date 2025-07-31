using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using server.Config;
using server.Data.Mongo;
using server.Middleware;
using server.Services;
using server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(
		policy =>
		{
			policy.WithOrigins("http://localhost:4200", "https://verbatim-six.vercel.app", "https://verbatim-api.up.railway.app", "https://verbatim.pro", "https://www.verbatim.pro")
			.AllowAnyHeader()
			.AllowAnyMethod();
		}
	);
});


builder.Services.Configure<MongoDbSettings>(
	builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IDrillService, DrillService>();
builder.Services.AddScoped<IDrillInputService, DrillInputService>();
builder.Services.AddScoped<IDrillSourceTextService, DrillSourceTextService>();
builder.Services.AddHttpClient<IFeedbackService, FeedbackService>(client =>
{
	client.Timeout = TimeSpan.FromSeconds(120);
});
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddHttpClient<IFuzzySearchService, FuzzySearchService>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(30);
});
builder.Services.AddScoped<IAdaptiveService, AdaptiveService>();
builder.Services.AddScoped<server.Utils.WordPoolManager>();


builder.Services.AddControllers()
	.AddJsonOptions(options =>
	{
		options.JsonSerializerOptions.Converters.Add(
			new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, allowIntegerValues: false)
		);
	});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters()
		{
			ValidateIssuer = true,
			ValidIssuer = builder.Configuration["AppSettings:Issuer"],
			ValidateAudience = true,
			ValidAudience = builder.Configuration["AppSettings:Audience"],
			ValidateLifetime = true,
			IssuerSigningKey = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"]!)
			),
			ValidateIssuerSigningKey = true
		};
	});

builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 15,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapScalarApiReference();
	app.MapOpenApi();
}

// Railway uses PORT environment variable
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    app.Urls.Add($"http://0.0.0.0:{port}");
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.UseMiddleware<ExceptionMiddleware>();

app.UseRateLimiter();

app.MapControllers();

// initialize word pool (loads from database into static storage by default)
using (var scope = app.Services.CreateScope())
{
    var wordPoolManager = scope.ServiceProvider.GetRequiredService<server.Utils.WordPoolManager>();
    try
    {
        await wordPoolManager.InitializeWordPoolAsync(initializeDatabase: true);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Failed to initialize word pool: {ex.Message}");
    }
}

app.Run();
