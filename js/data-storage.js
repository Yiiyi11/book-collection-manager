// 后端 API 基础地址（确保与后端服务器端口一致）
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * 获取所有图书数据
 * @returns {Promise<Array>} 图书数组
 */
export const getAllBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting books:', error);
    return []; // 出错时返回空数组，避免前端崩溃
  }
};

/**
 * 添加新图书
 * @param {Object} bookData 图书信息（title, author, isbn, status, category）
 * @returns {Promise<Object|boolean>} 成功返回新图书对象，失败返回 false
 */
export const addBook = async (bookData) => {
  try {
    // 基础验证（前后端双重验证更可靠）
    if (!bookData.title || !bookData.author || !bookData.isbn) {
      alert('Title, author and ISBN are required!');
      return false;
    }

    // 调用后端 API 添加图书
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    const newBook = await response.json();
    alert('Book added successfully!');
    return newBook;

  } catch (error) {
    console.error('Error adding book:', error);
    alert('Failed to add book. Please try again.');
    return false;
  }
};

/**
 * 删除图书
 * @param {string} id 图书 ID
 * @returns {Promise<boolean>} 成功返回 true，失败返回 false
 */
export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }

    alert('Book deleted successfully!');
    return true;

  } catch (error) {
    console.error('Error deleting book:', error);
    alert('Failed to delete book. Please try again.');
    return false;
  }
};

/**
 * 更新图书信息
 * @param {string} id 图书 ID
 * @param {Object} updatedData 要更新的字段（如 { status: 'Read' }）
 * @returns {Promise<Object|boolean>} 成功返回更新后的图书，失败返回 false
 */
export const updateBook = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }

    const updatedBook = await response.json();
    return updatedBook;

  } catch (error) {
    console.error('Error updating book:', error);
    alert('Failed to update book. Please try again.');
    return false;
  }
};

/**
 * 清空所有图书（测试用，实际项目谨慎使用）
 * @returns {Promise<boolean>} 操作结果
 */
export const clearAllBooks = async () => {
  if (!confirm('Are you sure you want to delete all books? This action cannot be undone.')) {
    return false;
  }

  try {
    // 先获取所有图书，再批量删除（实际项目可后端提供清空接口）
    const books = await getAllBooks();
    for (const book of books) {
      await deleteBook(book.id);
    }

    alert('All books have been deleted.');
    return true;

  } catch (error) {
    console.error('Error clearing all books:', error);
    alert('Failed to clear books. Please try again.');
    return false;
  }
};