using Temple.Core.Models.Errors;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Temple.WebApp.Extensions.Validation;
public static class ModelStateExtensions
{
    public static Result<string> ToResult<T>(this ModelStateDictionary modelState)
    {
        var result = new Result<string>(string.Empty);
        foreach (var entry in modelState)
        {
            foreach (var err in entry.Value.Errors)
            {
                if (!string.IsNullOrWhiteSpace(err.ErrorMessage))
                {
                    result.AddError(err.ErrorMessage);
                }
                if (err.Exception != null)
                {
                    result.AddError(err.Exception.Message);
                }
                if (err.Exception != null && err.Exception.InnerException != null)
                {
                    result.AddError(err.Exception.InnerException.Message);
                }
            }
        }

        return result;
    }
}