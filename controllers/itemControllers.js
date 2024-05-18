import mongoose from "mongoose";
import itemModel from "../models/itemModels.js";
import saleModel from "../models/salesModels.js";

export const AddItem = async (req, res) => {
  try {

	const { itemName, quantity, price, category } = req.body;
    if (!itemName || !quantity || !price) {
	  return res.status(400).json({
        message: "Some of the fields are missing.",
      });
    }

    const item = new itemModel({
						name: itemName,
						quantity: quantity,
						price: price,
						category: category,
					});

    await item.save();

    return res.status(200).json({
      message: 'Saved successfully!',
      success: true,
      data: item,
    });
  } catch (error) {
	return res.status(500).json({
		message: error.message,
	});
  }
}

export const getItems = async (req, res) => {
  try {
    const items = await itemModel.find();
    return res.status(200).json({
      message: "Items found successfully!",
      success: true,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
		message: error.message,
	});
  }
}

export const removeItem = async (req, res) => {

  try {
	const { itemId } = req.params;

    if (!itemId) {
	  return res.status(400).json({
        message: "itemId is missing.",
      });
    }

    const deletedItem = await itemModel.findByIdAndDelete({ _id: itemId });

    if (!deletedItem) {
		return res.status(404).json({
			message: "No item found.",
		});
    }

    return res.status(204).json({
      message: 'Deleted successfully!',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
		message: error.message,
	});
  }
}

export const updateItem = async (req, res) => {

  try {
	const { itemId } = req.params;
  	const { itemName, quantity, price, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
	  return res.status(400).json({
        message: "Invalid itemId",
      });
    }

    if (!itemName || !quantity || !price) {
		return res.status(400).json({
			message: "Some of the fields are missing.",
		  });
    }

    const updatedItem = await itemModel.findByIdAndUpdate(
							{ _id: itemId },
							{
								$set: {
								name: itemName,
								quantity: quantity,
								price: price,
								category: category,
								},
							},
							{
								new: true,
							}
						);

    return res.status(200).json({
      message: "Item updated successfully!",
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    return res.status(500).json({
		message: error.message,
	});
  }
}

export const addSale = async (req, res) => {
  try {
	const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
		return res.status(400).json({
			message: "Some of the fields are missing.",
		  });
    }
    const newSale = new saleModel({
						name: name,
						quantity: quantity,
						price: price,
					});

    await newSale.save();

    res.status(200).json({
      message: "Added sccessfully!",
      success: true,
      data: newSale,
    });
  } catch (error) {
    return res.status(500).json({
		message: error.message,
	});
  }
}

export const getAllSales = async (req, res) => {
  try {
    const sales = await saleModel.find();
    return res.status(200).json({
      message: "Sales found.",
      success: true,
      data: sales,
    });
  } catch (error) {
    return res.status(500).json({
		message: error.message,
	});
  }
}

export const removeSale = async (req, res, next) => {
  try {
	const { saleId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(saleId)) {
	  return res.status(400).json({
        message: "saleId is invalid.",
      });
    }
    const removedSale = await saleModel.findByIdAndDelete({ _id: saleId });

    if (!removedSale) {
	  return res.status(400).json({
        message: `No Sale found for saleId : ${saleId}`,
      });
    }

    return res.status(200).json({
      message: "Removed successfully!",
      success: true
    });
  } catch (error) {
    return res.status(500).json({
		message: error.message,
	});
  }
}
