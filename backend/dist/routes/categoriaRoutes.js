"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriaController_1 = require("../controllers/categoriaController");
const router = express_1.default.Router();
router.get('/categorias', categoriaController_1.getCategoriasHandler);
router.post('/categorias', categoriaController_1.crearCategoriaHandler);
router.put('/categorias', categoriaController_1.actualizarCategoriaHandler);
router.delete('/categorias', categoriaController_1.eliminarCategoriaHandler);
exports.default = router;
