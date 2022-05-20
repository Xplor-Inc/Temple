
export const Footer = () => {
    return <>
        <footer className="text-center container box-container" style={{ borderRadius: "0", padding: "10px" }}>
            <div>
                Created with &nbsp;<a href="https://dotnet.microsoft.com/en-us/" target="_blank" rel="noreferrer">
                    .NET 6.0.4</a>

                <span> | </span>
                &copy; {new Date().getFullYear()}
                <span> | </span>
                Version 0.0.4
            </div>
        </footer>
    </>
}
