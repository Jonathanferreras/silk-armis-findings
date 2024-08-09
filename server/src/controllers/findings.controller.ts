import { Request, Response } from "express";
import { groupedFindings, rawFindings } from "../services/findings.service";

export const getAllRawFindings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await rawFindings();

    if (result.error) {
      throw new Error("Error fetching raw findings");
    }

    res.json({ data: result.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unknown error occurred",
      });
    }
  }
};

export const getAllGroupedFindings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await groupedFindings();

    if (result.error) {
      throw new Error("Error fetching raw findings");
    }

    res.json({ data: result.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unknown error occurred",
      });
    }
  }
};
