import express from "express"
import fs from "fs"

const favoriteThingsRouter = new express.Router()

const favoriteThingsPath = "favoriteThings.json"

favoriteThingsRouter.get('/', (req, res) => {
  const jsonString = fs.readFileSync(favoriteThingsPath).toString()
  res.set({ 'Content-Type': 'application/json' }).status(200).json(JSON.parse(jsonString))
})

export default favoriteThingsRouter