using Scalar.AspNetCore;
using server.Config;
using server.Data.Mongo;
using server.Services;
using server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDbSettings>(
	builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IDrillService, DrillService>();
builder.Services.AddScoped<IDrillInputService, DrillInputService>();


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapScalarApiReference();
	app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
