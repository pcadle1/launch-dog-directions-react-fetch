import express from "express"
import clientRouter from "./clientRouter.js"
import favoriteThingsRouter from "./api/v1/favoriteThingsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/favorite-things", favoriteThingsRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
