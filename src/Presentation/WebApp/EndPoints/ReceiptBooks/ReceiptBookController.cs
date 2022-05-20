namespace Temple.WebApp.EndPoints.ReceiptBooks;

[Route("api/1.0/receiptbooks")]
[AppAuthorize]
public class ReceiptBookController : TempleController
{
    public IMapper                              Mapper                  { get; }
    public IRepositoryConductor<ReceiptBook>    ReceiptBookRepository   { get; }
    public IRepositoryConductor<User>           UserRepository          { get; }

    public ReceiptBookController(
        IMapper                             mapper,
        IRepositoryConductor<ReceiptBook>   receiptBookRepository,
        IRepositoryConductor<User>          userRepository)
    {
        Mapper                  = mapper;
        ReceiptBookRepository   = receiptBookRepository;
        UserRepository          = userRepository;
    }

    [HttpGet]
    public IActionResult Index()
    {
        Expression<Func<ReceiptBook, bool>> filter = e => e.DeletedOn == null;
        string? includePropperties = "IssuedToUser";
        if (CurrentRoleType == UserRole.Volunteer)
        {
            includePropperties = null;
            filter = filter.AndAlso(e => e.IssuedToUserId == CurrentUserId);
        }
        var receiptBookResult = ReceiptBookRepository.FindAll(filter, includeProperties: includePropperties);
        if (receiptBookResult.HasErrors)
        {
            return BadRequest(receiptBookResult.Errors);
        }
        var receiptBookDtos = Mapper.Map<List<ReceiptBookDto>>(receiptBookResult.ResultObject);
        return Ok(receiptBookDtos);
    }

    [HttpPost("issue")]
    public IActionResult IssueBook([FromBody] IssueBookDto dto)
    {        
        var issueToResult = UserRepository.FindAll(e => e.UniqueId == dto.IssuedTo);
        if (issueToResult.HasErrors)
        {
            return InternalError<UserDto>(issueToResult.Errors);
        }
        var issueTo = issueToResult.ResultObject.FirstOrDefault();
        if (issueTo == null)
        {
            return InternalError<UserDto>("Invalid user");
        }

        var receiptBookResult = ReceiptBookRepository.FindAll(e => e.ReceiptNo >= dto.From && e.ReceiptNo <= dto.To);
        if (receiptBookResult.HasErrors)
        {
            return InternalError<UserDto>(receiptBookResult.Errors);
        }
        var alreadyIssuedBooks = receiptBookResult.ResultObject.ToList();
        if (alreadyIssuedBooks.Count > 0)
        {
            return InternalError<UserDto>($"{string.Join(",", alreadyIssuedBooks.Select(e => e.ReceiptNo))} Receipt No(s) are already issued ");
        }

        var issuedBooks = new List<ReceiptBook>();
        for (int i = dto.From; i <= dto.To; i++)
        {
            var receiptBook = new ReceiptBook
            {
                ReceiptNo       = i,
                IssuedToUserId  = issueTo.Id,
                IssuedOn        = DateTime.Now,
                CreatedById     = CurrentUserId,
                CreatedOn       = DateTime.Now,
                UniqueId        = Guid.NewGuid()                
            };
            issuedBooks.Add(receiptBook);
        }

        var issuedResult = ReceiptBookRepository.Create(issuedBooks, CurrentUserId);
        if (issuedResult.HasErrors)
        {
            return InternalError<UserDto>(issuedResult.Errors);
        }
        return Ok(true);
    }

    [HttpPut("issue/{id:Guid}")]
    public IActionResult AddDonator(Guid id, [FromBody] DonorDto dto)
    {
        var receiptBookResult = ReceiptBookRepository.FindAll(e => e.UniqueId == id && e.IssuedToUserId == CurrentUserId);
        if (receiptBookResult.HasErrors)
        {
            return InternalError<DonorDto>(receiptBookResult.Errors);
        }
        var receiptBook = receiptBookResult.ResultObject.FirstOrDefault();
        if (receiptBook == null)
        {
            return InternalError<DonorDto>("Invalid Receipt No");
        }

        receiptBook.Address     = dto.Address;
        receiptBook.Name        = dto.Name;
        receiptBook.ContactNo   = dto.ContactNo;
        receiptBook.FathersName = dto.FathersName;
        receiptBook.Date        = dto.Date;
        receiptBook.Village     = dto.Village;
        receiptBook.Remark      = dto.Remark;

        if(!receiptBook.IsLocked)
            receiptBook.Amount = dto.Amount;

        var issuedResult = ReceiptBookRepository.Update(receiptBook, CurrentUserId);
        if (issuedResult.HasErrors)
        {
            return InternalError<UserDto>(issuedResult.Errors);
        }
        return Ok(true);
    }

    [HttpPut("receive")]
    public IActionResult ReceiveBook([FromBody] DepositVerifierDto dto)
    {
        var receiptBookResult = ReceiptBookRepository.FindAll(e => dto.ReceiptIds.Contains(e.UniqueId ));
        if (receiptBookResult.HasErrors)
        {
            return InternalError<DonorDto>(receiptBookResult.Errors);
        }
        var receiptBooks = receiptBookResult.ResultObject.ToList();
        if (receiptBooks.Count == 0)
        {
            return InternalError<DonorDto>("Invalid Receipt No");
        }
        receiptBooks.ForEach(e => { e.ReceivedOn = dto.ReceiveDate; e.ReceivedByUserId = CurrentUserId; e.IsLocked = true; });
        var issuedResult = ReceiptBookRepository.Update(receiptBooks, CurrentUserId);
        if (issuedResult.HasErrors)
        {
            return InternalError<UserDto>(issuedResult.Errors);
        }
        return Ok(true);
    }

}