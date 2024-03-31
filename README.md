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

---

## Branch and Commit Conventions

### Branch Naming Convention:
- Each branch corresponds to a user history, and the branch name should follow the format:
  ```
  PBI-IDENTIFIER-UH-IDENTIFIER
  ```
  Example: `PBI-ADM-US01`

- The branches should branch off from the `develop` branch.

### Commit Message Convention:
- Each commit message should follow the format:
  ```
  feat(PBI-IDENTIFIER-UH-IDENTIFIER-TICKETNUMBER): Description of the commit
  ```
  Example: `feat(PBI-ADM-US01-01): Implement DAO for administrators`

### Pull Requests (PR):
- After completing the work related to a ticket, create a Pull Request (PR) from the corresponding branch to `develop`.
- PR title should briefly describe the changes made.
- Include a description in the PR explaining the purpose of the changes and any relevant information.
- Assign reviewers to the PR to ensure code quality and adherence to standards.
- Once the PR is approved and any necessary changes are made, merge it into `develop`.

### Example Workflow:
1. **Create a New Ticket Branch:**
   ```
   git checkout -b PBI-ADM-US01
   ```

2. **Work on the Ticket:**
   Make changes, add commits, and push the branch to the remote repository.

3. **Create a Pull Request:**
   - Title: Implement DAO for administrators
   - Description: This PR implements the Data Access Object (DAO) for handling administrative tasks.
   - Assign reviewers and wait for feedback.

4. **Merge Pull Request:**
   Once the PR is approved and any requested changes are made, merge it into `develop`.

### Additional Guidelines:
- Follow the Single Responsibility Principle (SRP) when making commits. Each commit should represent a single logical change.
- Use clear and descriptive commit messages to provide context and aid in understanding the changes made.
- Keep commits small and focused to facilitate code review and future maintenance.

By following these conventions, we ensure consistency and traceability in our branching and commit practices, making it easier to manage and collaborate on the project.
