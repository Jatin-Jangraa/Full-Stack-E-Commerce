import { json } from "express";
import { mycache } from "../index.js";
import { Product } from "../models/product.models.js";
import { invalidateCache } from "../utils/features.js";

export const newproduct = async (req, res) => {
  const { name, photo, price, stock, category } = req.body;

  try {
    const newproduct = await Product.create({
      name,

      photo,
      price,
      stock,
      category,
    });

    invalidateCache(Product)
    res.json(newproduct);
  } catch (error) {
    res.json({ error });
  }
};


export const latestproduct = async (req, res) => {

  let products;
  if (mycache.has("products"))
    products = JSON.parse(mycache.get("products"))
  else {
    products = await Product.find({}).sort({ createdAt: -1}).limit(10);

    mycache.set("products",JSON.stringify(products))
  }



  res.json(products)
};


export const categoryproduct = async (req, res) => {

  let cateproduct;
  if (mycache.has("cateproduct"))
    cateproduct = JSON.parse(mycache.get("cateproduct"))
  else {

 cateproduct = await Product.distinct("category")

 mycache.set("cateproduct",JSON.stringify(cateproduct))
  }
  res.json(cateproduct)

}


export const adminproduct = async (req, res) => {

  let allproduct;
  if (mycache.has("allproduct"))
    allproduct = JSON.parse(mycache.get("allproduct"))
  else {
    allproduct = await Product.find({})
    mycache.set("allproduct",JSON.stringify(allproduct))
  }

  

  res.json(allproduct)

}


export const findsingleproduct = async (req, res) => {

  const cateproduct = await Product.findById(req.params.id)

  res.json(cateproduct)

}



export const updateproduct = async (req, res) => {



  const updates = req.body;


  const updatedproduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true }


  )

  invalidateCache()
  res.json(updatedproduct)
}



export const deleteproduct = async (req, res) => {


  try {
    const productid = await Product.findById(req.params.id);

    await productid.deleteOne()
    res.json({

      message: "product Deleted Successfully"
    });


    invalidateCache(product)
  } catch (error) {
    res.json({
      message: "Product Not Exists"
    });
  }

}


export const searchdata = async (req, res) => {

  const { name, sort, category, price } = req.query;

  const baseQuery = {

    ...name ? { name: { $regex: name, $options: "i" } } : null,

    ...price ? { price: { $lte: Number(price) } } : null,

    ...category ? { category: category } : null,
  }



  const productsearch = await Product.find(baseQuery).sort(
    sort && { price: sort === "asc" ? 1 : -1 }
  )

  res.json(productsearch)

}















