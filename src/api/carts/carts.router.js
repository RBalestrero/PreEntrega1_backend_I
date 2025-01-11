import { Router } from "express";
import { cartManager } from "../../managers/cart.manager.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.products) throw new Error("products is required");
    const cart = await cartManager.createCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await cartManager.saveProdToCart(req.params.cid, req.params.pid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;