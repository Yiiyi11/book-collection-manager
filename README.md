<<<<<<< Updated upstream
# book-collection-manager
ISYS3001 A2 - Small Book Collection Management Web App (No Firebase)
=======
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
Weeks 1-5
## 部署信息
- 在线访问地址：https://github.com/Yiiyi11/book-collection-manager
- 部署方式：GitHub Pages（基于main分支自动部署）

## 使用指南
1. 访问首页，点击“添加新图书”录入信息（ISBN不可重复）
2. 在首页可通过搜索框和下拉框筛选图书
3. 点击图书后的“删除”按钮可移除图书
4. 点击“导出图书清单”可下载CSV文件备份

## 测试报告
- 所有功能测试通过（详见docs/test-plan.md）
- 兼容浏览器：Chrome、Firefox、Edge、Safari
- 支持设备：PC、手机（响应式布局）
>>>>>>> Stashed changes
