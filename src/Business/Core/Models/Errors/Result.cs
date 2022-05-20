﻿namespace Temple.Core.Models.Errors;
public class Result<T>
{
    #region Properties

    public virtual List<string>         Errors          { get; set; } = new List<string>();
    public virtual bool                 HasErrors =>    Errors != null && Errors.Any();
    public virtual T                    ResultObject    { get; set; }
    public long                         RowCount        { get; set; }
    public Dictionary<string, object>?  Info            { get; set; }

    #endregion Properties


    #region Constructors

    public Result(T resultObject, string errorMessage) { ResultObject = resultObject; this.AddError(errorMessage); }
    public Result(T resultObject) => ResultObject = resultObject;

    #endregion Constructors
}
