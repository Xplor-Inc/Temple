namespace Temple.WebApp;
public abstract class TempleController : ControllerController
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        base.OnActionExecuted(context);
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        base.OnActionExecuting(context);
    }

    protected const int Take = 100;
    protected virtual TempleClaimsPrincipal? TempleClaims { get; set; }
    protected virtual UserRole? CurrentRoleType => TempleClaims != null ? TempleClaims.UserRole : User.RoleType();
    protected virtual long      CurrentUserId   => TempleClaims != null ? TempleClaims.UserId : User.UserId();
}