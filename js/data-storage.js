// 定义本地存储的键名（统一管理，避免拼写错误）
const STORAGE_KEY = 'bookCollection';

// 1. 初始化本地存储（若无数据，创建空数组）
function initStorage() {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

// 2. 添加图书（参数：图书对象，返回成功/失败提示）
export function addBook(bookData) {
  // 先初始化存储
  initStorage();
  
  // 获取现有图书数据
  const books = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
  // 检查ISBN是否重复（ISBN作为唯一标识，避免重复添加）
  const isIsbnDuplicate = books.some(book => book.isbn === bookData.isbn);
  if (isIsbnDuplicate) {
    alert(`添加失败：ISBN为"${bookData.isbn}"的图书已存在！`);
    return false; // 标记添加失败
  }
  
  // 补充添加时间（格式：2025/9/10 14:30:00）
  bookData.addTime = new Date().toLocaleString();
  
  // 添加新图书到数组
  books.push(bookData);
  
  // 保存回本地存储
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  
  alert("图书添加成功！（数据已保存在浏览器本地）");
  return true; // 标记添加成功
}

// 3. 获取所有图书（返回图书数组，无数据则返回空数组）
export function getAllBooks() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// 4. 删除图书（参数：ISBN，用于定位删除对象）
export function deleteBook(isbn) {
  initStorage();
  const books = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
  // 过滤掉要删除的图书（保留ISBN不等于目标的图书）
  const updatedBooks = books.filter(book => book.isbn !== isbn);
  
  // 若数据无变化（未找到对应ISBN），提示失败
  if (updatedBooks.length === books.length) {
    alert(`删除失败：未找到ISBN为"${isbn}"的图书！`);
    return false;
  }
  
  // 保存更新后的数据
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
  alert("图书删除成功！（本地数据已更新）");
  return true;
}

// 5. 清空所有图书（用于测试，可选功能）
export function clearAllBooks() {
  if (confirm("确定要清空所有图书数据吗？此操作不可恢复！")) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    alert("所有图书数据已清空！");
    return true;
  }
  return false;
}

// 页面加载时自动初始化存储
initStorage();