// 导入获取所有图书的方法
import { getAllBooks } from './data-storage.js';

// 搜索与筛选主函数
export function filterBooks(searchTerm, statusFilter, categoryFilter) {
  const allBooks = getAllBooks();
  
  // 过滤逻辑：同时满足搜索词、状态、分类条件
  return allBooks.filter(book => {
    // 搜索词匹配（书名或作者包含搜索词，不区分大小写）
    const matchesSearch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 状态筛选（空表示不筛选）
    const matchesStatus = statusFilter === '' || book.status === statusFilter;
    
    // 分类筛选（空表示不筛选）
    const matchesCategory = categoryFilter === '' || book.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
}