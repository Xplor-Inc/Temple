using Temple.Core.Models.Reports;

namespace Temple.Core.Interfaces.Domain.Reports;

public interface IReportConductor
{
    Result<bool> ValidateTransactions(long createdById, Guid bankId);
    /// <summary>
    /// Generate the expense report based on the given parameters, and return the report as Categorywise, Bankwise, and daily summary
    /// </summary>
    /// <param name="fromDate">From Date</param>
    /// <param name="toDate">To Date</param>
    /// <returns>Returns chart data</returns>
    Result<object> ExpenseSummary(long createdById, DateTimeOffset fromDate, DateTimeOffset toDate);

    /// <summary>
    /// Generate the total balance summary as Income, Expense and Saving
    /// </summary>
    /// <returns>Returns total balanse summary as Income, Expense and Saving</returns>
    Result<object> BalanceSummary(long createdById);

    /// <summary>
    /// Generate the month wise total comparision summary as Income, Expense and Saving
    /// </summary>
    /// <param name="fromDate">From Date</param>
    /// <param name="toDate">To Date</param>
    /// <returns>Returns chart data</returns>
    Result<List<AccountSumary>> OverAllSummary(long createdById);
}
