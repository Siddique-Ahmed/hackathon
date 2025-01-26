import { loanModel } from "../models/loan.model.js";
import { userModel } from "../models/user.model.js";

const loanRequest = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      amount,
      loanPeriod,
      guaranterName1,
      guaranterName2,
      guaranterEmail1,
      guaranterEmail2,
      guaranterCnic1,
      guaranterCnic2,
    } = req.body;
    const userId = req.id;
    console.log(userId);

    if (
      !category ||
      !subCategory ||
      !amount ||
      !loanPeriod ||
      !guaranterName1 ||
      !guaranterName2 ||
      !guaranterEmail1 ||
      !guaranterEmail2 ||
      !guaranterCnic1 ||
      !guaranterCnic2
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingRequst = await loanModel.findOne({subCategory});
    console.log("existingRequst", existingRequst);

    if (existingRequst) {
      return res.status(400).json({
        message: "You have already requested a loan",
        success: false,
      });
    }

    const newLoanRequest = new loanModel({
      userId,
      category,
      subCategory,
      amountRequested: amount,
      loanPeriod,
      gauntator1: {
        fullName: guaranterName1,
        email: guaranterEmail1,
        cnic: guaranterCnic1,
      },
      gauntator2: {
        fullName: guaranterName2,
        email: guaranterEmail2,
        cnic: guaranterCnic2,
      },
    });

    await newLoanRequest.save();

    return res.status(201).json({
      message: "Loan request submitted successfully",
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

const getLoanRequest = async (req, res) => {
  try {
    const userId = req.id;

    const loanRequest = await loanModel.find({ userId });

    if (!loanRequest) {
      return res.status(404).json({
        message: "No loan request found",
        success: false,
      });
    }

    return res.status(200).json({
      loanRequest,
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

export { loanRequest, getLoanRequest };
