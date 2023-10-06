const fs = require("fs").promises;
const path = require("path");

class Library {
  constructor() {
    this.filePath = path.join(__dirname, "..", "db", "Library.json");
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        // Arquivo não encontrado
        await fs.writeFile(this.filePath, JSON.stringify([], null, 2));
        return [];
      } else {
        throw error; // Re-lança o erro se não for ENOENT
      }
    }
  }

  async writeToFile(books) {
    await fs.writeFile(this.filePath, JSON.stringify(books, null, 2));
  }

  async addBook(title, author, isbn) {
    const book = { title, author, isbn };

    const bookExist = await this.getBook(isbn);

    if (bookExist == null) {
      const books = await this.readFile();

      books.push(book);
      await this.writeToFile(books);
      return book;
    } else {
      return null;
    }
  }

  async getBook(isbn) {
    const books = await this.readFile();
    const book = books.find((book) => book.isbn === isbn);
    return book || null;
  }

  async getAllBooks() {
    return await this.readFile();
  }

  async updateBook(isbn, updatedInfo) {
    const books = await this.readFile();
    const bookIndex = books.findIndex((book) => book.isbn === isbn);

    if (bookIndex !== -1) {
      const updatedBook = { ...books[bookIndex], ...updatedInfo };
      books[bookIndex] = updatedBook;
      await this.writeToFile(books);
      return updatedBook;
    }
    return null;
  }

  async deleteBook(isbn) {
    const books = await this.readFile();
    const bookIndex = books.findIndex((book) => book.isbn === isbn);
    if (bookIndex !== -1) {
      const [deletedBook] = books.splice(bookIndex, 1);
      await this.writeToFile(books);
      return deletedBook;
    }
    return null;
  }
}

module.exports = Library;
