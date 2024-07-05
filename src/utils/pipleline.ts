import { PipelineStage } from "mongoose";

export const getProductsPipeline:PipelineStage[] = [
  {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "categoryDetails"
    }
  },{
    $unwind: {
      path: "$categoryDetails",
      preserveNullAndEmptyArrays:true
    }
  },
  {
    $addFields: {
      categoryName: "$categoryDetails.categoryName"
    }
  }
]