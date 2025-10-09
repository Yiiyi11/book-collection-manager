<<<<<<< HEAD

# book-collection-manager
ISYS3001 A2 - Small Book Collection Management Web App (No Firebase)

=======
# book-collection-manager
ISYS3001 A2 - Small Book Collection Management Web App (No Firebase)
>>>>>>> 76c65f295233d641a4207c17a2d0c45e7316c37e
# Small-Scale Book Collection Management Web Application
## Project Background
This project is Assignment A2 for the ISYS3001 course. It aims to develop a web application that supports book information management, featuring functions such as book entry, search and filtering, and CSV export (Firebase is not used; localStorage is adopted for local storage).
## Technology Stack
- Frontend: HTML5 + CSS3 + JavaScript + Bootstrap 5 (responsive layout)
- Data Storage: localStorage (browser local storage, no backend/third-party services required)
- Export Function: SheetJS (xlsx.js, generates CSV files on the frontend)
- Version Control: Git + GitHub (branch management and code hosting)
- Local Preview: VS Code Live Server extension
## Functional Modules
1. Book Entry: Supports input of book title, author, ISBN, reading status, and category; data is stored locally.
2. Book Management: Displays books in a list, enables keyword search (by title/author), and supports category filtering (by status/category).
3. List Export: Exports book data stored locally in CSV format, with optimized Chinese encoding support.
## Development Cycle
<<<<<<< HEAD

Weeks 1-5 (September 7 - October 6, 2025)

## Deployment Information
- Online access address: https://github.com/Yiiyi11/book-collection-manager
- Deployment method: GitHub Pages (automatic deployment based on the main branch)

=======
Weeks 1-5 (September 7 - October 6, 2025)
## Deployment Information
- Online access address: https://github.com/Yiiyi11/book-collection-manager
- Deployment method: GitHub Pages (automatic deployment based on the main branch)
>>>>>>> 76c65f295233d641a4207c17a2d0c45e7316c37e
## Usage Guide
1. Go to the homepage and click "Add New Book" to enter information (ISBN cannot be repeated)
2. On the homepage, you can filter books by search box and drop-down box
3. Click the "Delete" button after the book to remove the book
4. Click "Export Book List" to download the CSV file backup
<<<<<<< HEAD

=======
>>>>>>> 76c65f295233d641a4207c17a2d0c45e7316c37e
## Test Report
- All functional tests passed (see docs/test-plan.md for details)
- Compatible browsers: Chrome, Firefox, Edge, Safari
- Supported Devices: PC, Mobile (Responsive Layout)
