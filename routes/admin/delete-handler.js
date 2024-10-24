const { Router } = require("express");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");
const response = require("../../utils/response");

// Controller to dynamically delete a document from User, Product, or Order model
const deleteDocument = async (req, res) => {
  try {
    const { model, id } = req.params;
    console.log({ model, id });

    // Determine which model to use based on the request
    let Model;
    if (model === "user") {
      Model = User;
    } else if (model === "product") {
      Model = Product;
    } else if (model === "order") {
      Model = Order;
    } else {
      return response(res, 400, "Invalid model specified", {});
    }

    // Find and delete the document by ID
    const deletedDoc = await Model.findByIdAndDelete(id);

    // If no document is found
    if (!deletedDoc) {
      return response(res, 404, `${model} not found with ID: ${id}`, {});
    }

    // Return success response with deleted document information
    return response(res, 200, `${model} deleted successfully`, deletedDoc);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Error deleting document", {
      error: error.message,
    });
  }
};

const router = Router();

router.delete("/:model/:id", deleteDocument);

module.exports = router;
