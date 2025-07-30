using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Entities.Enums;
using server.Entities.Models;

namespace server.Services.Interfaces
{
    public interface IFeedbackService
    {
        Task<object> GetRequestStatisticsAsync(string userId);
        Task<AIFeedbackDTO> GetAIInsightsAsync(string userId);
        Task<bool> CanGenerateFeedback(string userId);
    }
}