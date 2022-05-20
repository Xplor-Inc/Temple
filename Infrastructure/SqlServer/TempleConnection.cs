using Temple.Core.Models.Configurations;

namespace Temple.SqlServer;
public class TempleConnection : Connection
{
    #region Overrides of Connection

    public override string ToString(string delimiter = ";")
    {
        return $"Data Source={Datasource}; Database={Database}; User Id={UserId}; Password={Password}; {AdditionalParameters}";
    }

    #endregion
}