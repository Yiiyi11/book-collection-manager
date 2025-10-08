// 导入获取所有图书的方法
import { getAllBooks } from './data-storage.js';

// 从URL获取筛选参数
export function getFilterParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    searchTerm: params.get('search') || '',
    status: params.get('status') || '',
    category: params.get('category') || ''
  };
}

// 根据筛选条件过滤图书
export function filterBooks(books, filterParams) {
  if (!filterParams.searchTerm && !filterParams.status && !filterParams.category) {
    return books; // 无筛选条件，返回所有图书
  }
  
  return books.filter(book => {
    const matchesSearch = !filterParams.searchTerm || 
      book.title.toLowerCase().includes(filterParams.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(filterParams.searchTerm.toLowerCase());
    
    const matchesStatus = !filterParams.status || book.status === filterParams.status;
    const matchesCategory = !filterParams.category || book.category === filterParams.category;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

// 执行导出操作
export function exportBooks() {
  try {
    // 重置状态提示
    document.getElementById('exportStatus').classList.add('d-none');
    document.getElementById('exportError').classList.add('d-none');
    
    // 获取所有图书数据
    const allBooks = getAllBooks();
    
    // 检查是否有数据
    if (allBooks.length === 0) {
      throw new Error("没有可导出的图书数据，请先添加图书");
    }
    
    // 获取筛选参数
    const filterParams = getFilterParams();
    // 根据选择的范围获取要导出的图书
    const exportRangeAll = document.getElementById('exportAll').checked;
    let booksToExport = exportRangeAll ? allBooks : filterBooks(allBooks, filterParams);
    
    // 检查筛选后是否有数据
    if (booksToExport.length === 0) {
      throw new Error("所选范围内没有可导出的图书数据");
    }
    
    // 准备导出数据（只包含需要的字段，调整顺序）
    const exportData = booksToExport.map(book => ({
      "书名": book.title,
      "作者": book.author,
      "ISBN": book.isbn,
      "阅读状态": book.status,
      "分类": book.category,
      "添加时间": book.addTime
    }));
    
    // 使用SheetJS生成CSV
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "图书清单");
    
    // 生成文件名（包含当前日期，如20250915_book_collection.csv）
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const fileName = `${today}_book_collection.csv`;
    
    // 导出文件
    XLSX.writeFile(workbook, fileName);
    
    // 显示成功提示
    document.getElementById('exportStatus').classList.remove('d-none');
    
    // 3秒后隐藏成功提示
    setTimeout(() => {
      document.getElementById('exportStatus').classList.add('d-none');
    }, 3000);
    
  } catch (error) {
    // 显示错误信息
    document.getElementById('errorMessage').textContent = error.message;
    document.getElementById('exportError').classList.remove('d-none');
  }
}

// 初始化导出页面
export function initExportPage() {
  // 绑定导出按钮事件
  document.getElementById('exportBtn').addEventListener('click', exportBooks);
  
  // 页面加载时检查是否有筛选参数，如果有则自动选择"仅当前筛选结果"
  const filterParams = getFilterParams();
  if (filterParams.searchTerm || filterParams.status || filterParams.category) {
    document.getElementById('exportFiltered').checked = true;
  }
}
    