const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// 初始化 Express 应用
const app = express();
const PORT = 3001; // 后端服务端口（与前端端口不同，避免冲突）

// 数据存储文件路径
const booksFilePath = path.join(__dirname, 'data', 'books.json');

// 中间件：解决跨域、解析 JSON 格式请求体
app.use(cors());
app.use(bodyParser.json());

// 初始化数据文件（如果不存在则创建）
if (!fs.existsSync(booksFilePath)) {
  fs.mkdirSync(path.dirname(booksFilePath), { recursive: true });
  fs.writeFileSync(booksFilePath, JSON.stringify([], null, 2));
}

// 读取所有图书数据
const getBooks = () => {
  const data = fs.readFileSync(booksFilePath, 'utf8');
  return JSON.parse(data);
};

// 写入图书数据到文件
const saveBooks = (books) => {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

// API 接口：获取所有图书
app.get('/api/books', (req, res) => {
  const books = getBooks();
  res.json(books);
});

// API 接口：添加新图书
app.post('/api/books', (req, res) => {
  const newBook = {
    id: Date.now().toString(), // 用时间戳作为唯一 ID
    ...req.body,
    addTime: new Date().toISOString() // 添加时间
  };
  const books = getBooks();
  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook); // 201 表示创建成功
});

// API 接口：删除图书（根据 ID）
app.delete('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  let books = getBooks();
  const initialLength = books.length;
  books = books.filter(book => book.id !== bookId);
  
  if (books.length === initialLength) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  saveBooks(books);
  res.json({ message: 'Book deleted successfully' });
});

// API 接口：更新图书（根据 ID）
app.put('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  let books = getBooks();
  const index = books.findIndex(book => book.id === bookId);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  // 更新图书信息（保留 ID 和添加时间，其他字段覆盖）
  books[index] = {
    ...books[index],
    ...req.body
  };
  
  saveBooks(books);
  res.json(books[index]);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});