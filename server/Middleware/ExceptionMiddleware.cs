using System.Net;
using System.Security.Claims;
using System.Text.Json;
using server.Data.Mongo;
using server.Entities;
using server.Entities.Core;

namespace server.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        private readonly MongoDbContext _db;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env, MongoDbContext db)
        {
            _next = next;
            _logger = logger;
            _env = env;
            _db = db;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                // Log exceptions in database
                if (!_env.IsDevelopment())
                {
                    var userId = context.User?.FindFirstValue(ClaimTypes.NameIdentifier);

                    var errorLog = new ErrorLog
                    {
                        Path = context.Request.Path,
                        Message = ex.Message,
                        StackTrace = ex.StackTrace,
                        UserId = userId
                    };

                    var _ = _db.ErrorLog.InsertOneAsync(errorLog);
                }

                _logger.LogError(ex, "Unhandled exception occurred");

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = new
                {
                    status = 500,
                    error = "Internal Server Error",
                    message = _env.IsDevelopment() ? ex.Message : "An unexpected error occurred.",
                    stackTrace = _env.IsDevelopment() ? ex.StackTrace : null
                };

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}