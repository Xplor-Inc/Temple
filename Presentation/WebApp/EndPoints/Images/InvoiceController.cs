using Temple.Core.Models.Configuration;

namespace Temple.WebApp.EndPoints;

[Route("dynamic/images/transaction")]
[AppAuthorize]
public class InvoiceController : TempleController
{
    #region Properties

    private StaticFileConfiguration             FileConfiguration    { get; }
    public IRepositoryConductor<ReceiptBook>    TransactionConductor { get; }
    #endregion

    public InvoiceController(
        StaticFileConfiguration             fileConfiguration,
        IRepositoryConductor<ReceiptBook>   transactionConductor)
    {
        FileConfiguration       = fileConfiguration;
        TransactionConductor    = transactionConductor;
    }

    [HttpGet("{invoice}")]
    public IActionResult GetInvoice(string invoice)
    {
        if (FileConfiguration.Invoice == null)
        {
            return InternalError<string>("Transaction not found");
        }

        var invoicePath = Path.Combine(Environment.CurrentDirectory, FileConfiguration.RootFolder, FileConfiguration.Invoice.Path);
        var type        = invoice.Split('.').Last();
        string filePath = @$"{invoicePath}\{invoice}";
        
        if (System.IO.File.Exists(filePath))
            return PhysicalFile(filePath, $"image/{type}");
        else
            return Ok(null);

    }

    [HttpPost("{id:Guid}")]
    public async Task<IActionResult> UploadInvoice(Guid id,IFormFile file)
    {
        if (file == null)
        {
            return InternalError<string>("Invalid file");
        }
        var extention = Path.GetExtension(file.FileName);
        
        if (FileConfiguration.Invoice == null || !FileConfiguration.Invoice.Type.Contains(extention) || file.Length == 0)
        {
            return InternalError<string>($"{extention} file type is not allowed");
        }
        if (file.Length > FileConfiguration.MaxFileSize) { return InternalError<string>($"File size limit excceded"); }

        var transactionResult = TransactionConductor.FindAll(e => e.UniqueId == id && e.DeletedOn == null);
        if (transactionResult.HasErrors)
        {
            return InternalError<string>(transactionResult.Errors);
        }
        var transaction = transactionResult.ResultObject.FirstOrDefault();
        if (transaction == null)
        {
            return InternalError<string>("Transaction not found");
        }

        var invoicePath = Path.Combine(Environment.CurrentDirectory, FileConfiguration.RootFolder, FileConfiguration.Invoice.Path);
        DirectoryInfo di = new(invoicePath);
        if (!di.Exists)
        {
            di.Create();
        }
        //Delete old files if they exists
        var files = di.GetFiles().Where(e => e.Name.StartsWith($"{CurrentUserId:N}"));
        if (files.Any())
        {
            files.ToList().ForEach(f => f.Delete());
        }
        var name = $"{id:N}{extention}";

        var path = Path.Combine(invoicePath, name);
        using var stream = System.IO.File.Create(path);
        await file.CopyToAsync(stream);

       // transaction.InvoicePath = $"{id:N}{extention}";
        TransactionConductor.Update(transaction, CurrentUserId);

        return Ok(true);
    }
}