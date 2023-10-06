const Library = require("../../services/LibraryRepository");

const LibraryRepository = new Library();

const LibraryController = {
  create: async (req, res) => {
    const { title, author, isbn } = req.body;

    const book = await LibraryRepository.addBook(title, author, isbn);

    if(book == null) {
        return res.status(400).json({
            msg: "Número de Livro já existente",
        })
    } 

    return res.status(200).json({
      msg: "Funcionou!",
      book,
    });
  },

  getAll: async (req, res) => {
    const books = await LibraryRepository.getAllBooks();

    return res.status(200).json({
      msg: "Livrous encontrados",
      books,
    });
  },

  getBook: async (req, res) => {
    const { isbn } = req.params;

    const book = await LibraryRepository.getBook(isbn);

    return res.status(200).json({
        msg: "Seu livro foi encontrado!",
        book
    });
  },

  update: async (req, res) => {
    const { title, author, isbn } = req.body;

    const book = await LibraryRepository.updateBook(isbn, { title, author });

    return res.status(200).json({
        msg: "Livrous Atualizados",
        book
    });
  },
  
  delete: async (req, res) => {
    const { isbn } = req.params;

    await LibraryRepository.deleteBook(isbn);

    return res.status(200).json({
        msg: "O livrou foi deletado com sucesso"
    });
  },
};

module.exports = LibraryController;
