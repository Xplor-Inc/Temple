namespace Temple.Core.Interfaces.Conductors.Budget;

public interface IBudgetConductor
{
    Result<bool> ProcessBudget(decimal amount, DateTimeOffset date, long updatedById);
}