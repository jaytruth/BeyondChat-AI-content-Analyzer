import { Router } from "express";
import {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
} from "../controllers/article.controller.js"

const router = Router()
router.get("/",getAllArticles)
router.get("/:id",getArticleById)
router.get("/",createArticle)
router.get("/:id",updateArticle)
router.get("/:id",deleteArticle)

export default router