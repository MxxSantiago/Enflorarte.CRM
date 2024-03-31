# Enflorarte.CRM

---

The following prerequisites are required to build and run the solution:
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (latest version)
- [Node.js](https://nodejs.org/) (latest LTS version)

### Build

Run `dotnet build -tl` to build the solution.

### Run

To run the web application:

```bash
cd .\src\Web\
dotnet watch run
```

Navigate to https://localhost:5001. The application will automatically reload if you change any of the source files.


When you run the application the database will be automatically created (if necessary) and the latest migrations will be applied.
Running database migrations is easy. Ensure you add the following flags to your command (values assume you are executing from repository root)
* `--project src/Infrastructure` (optional if in this folder)
* `--startup-project src/Web`
* `--output-dir Data/Migrations`
  For example, to add a new migration from the root folder:
  `dotnet ef migrations add "SampleMigration" --project src\Infrastructure --startup-project src\Web --output-dir Data\Migrations`

## Code Styles & Formatting
The template includes [EditorConfig](https://editorconfig.org/) support to help maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. The **.editorconfig** file defines the coding styles applicable to this solution.

## License
This project is licensed with the [MIT license](LICENSE).