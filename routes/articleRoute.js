import express from 'express';
import ArticleModel from '../models/article.js';

const router = express.Router()

const keysArr = ["title", "description", "content"];
keysArr.sort();

const isTheSameArray = (currentValue) => currentValue === keysArr;

//Post article
router.post("/articles", async (req, res) => {
    const article = new ArticleModel(req.body)
    try {
        await article.save()
        res.status(201).send(article)
    } catch (error) {
        res.status(500).send(error)
    }
})


//Get article
router.get("/article/:title", async (req, res) => {
    const articleTitle = req.params.title
    try {
        const article = await ArticleModel.find({ title: articleTitle })
        res.status(200).send(article)
    } catch (error) {
        res.status(500)
    }
})


//Delete article
router.delete("/article/:title", async (req, res) => {
    const articleTitle = req.params.title
    try {
        const article = await ArticleModel.deleteOne({ title: articleTitle })
        res.status(200).send(article)
    } catch (error) {
        res.status(500)
    }
})


//Update article
router.put("/article/:title", async (req, res) => {
    try {

        const title = req.body.title
        const description = req.body.description
        const content = req.body.content

        if ([title, description, content].includes(undefined)) {
            return res.status(400).json({
                msg: "Bad request",
                status: 400,
                body: "Missing parameters"
            })
        }


        const article = await ArticleModel.updateOne({ title }, req.body)
        res.status(200).send(article)
    } catch (error) {
        res.status(500)
    }
})


//Patch article
router.patch("/article/:title", async (req, res) => {
    const articleTitle = req.params.title
    try {
        const article = await ArticleModel.updateOne({ title: articleTitle }, req.body)
        res.status(200).send(article)
    } catch (error) {
        res.status(500)
    }
})

export default router