import { Router } from "express";
import { prodManager } from "../../managers/product.manager.js";
const router = Router();


router.get("/", async (req, res) => {
  try {
    const products = await prodManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await prodManager.getById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if(!req.body.title) throw new Error('title is required');
    if(!req.body.description) throw new Error('description is required');
    if(!req.body.code) throw new Error('code is required');
    if(!req.body.price) throw new Error('price is required');
    if(!req.body.stock) throw new Error('stock is required');
    if(!req.body.category) throw new Error('category is required');
    req.body.status = req.body.status || true;
    const product = await prodManager.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const product = await prodManager.update(req.body, req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const product = await prodManager.delete(req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;