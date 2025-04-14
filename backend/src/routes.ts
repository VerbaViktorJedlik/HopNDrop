import express from "express"

export const router = express.Router()

router.post("/package/:id/take", take)
router.post("/package/:id/deliver", deliver)
router.post("/package/:id/revice", recive)


async function name(params:type) {
    
}

export default router
