import { log } from "console";
import { loanModel } from "../models/loan.model.js";

const getAllRequest = async (_, res) => {
  try {
    const allRequests = await loanModel.find();

    if (!allRequests) {
      return res.status(401).json({
        message: "no request found!",
        success: false,
      });
    }

    res.status(200).json({
      requests: allRequests,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({
      message: `Server error: ${error.message}`,
      success: false,
    });
  }
};
const updateStatus = async (req, res) => {
  try {
    const loanId = req.params.id;

    const loan = await loanModel.findById(loanId);

    console.log(loan)

  } catch (error) {
    console.log(error.message);
    return res.status(501).json({
      message: `Server error: ${error.message}`,
      success: false,
    });
  }
};

export { getAllRequest, updateStatus };
