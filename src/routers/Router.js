const { Router } = require("express");
const LibraryController = require("../controllers/Library/LibraryController");

const router = Router();

router.post("/criar-livro", (req, res) => {
    LibraryController.create(req, res)
});

router.put("/atualizar-livro", (req, res) => {
    LibraryController.update(req, res)
});

router.get("/buscar-livros", (req, res) => {
    LibraryController.getAll(req, res)
});

router.get("/buscar-livro/:isbn", (req, res) => {
    LibraryController.getBook(req, res)
});

router.delete("/deletar-livro/:isbn", (req, res) => {
    LibraryController.delete(req, res)
});

module.exports = router;
