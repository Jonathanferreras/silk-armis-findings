import GroupedFindings from "../models/groupedFindings";
import RawFinding from "../models/rawFinding";

export const rawFindings = async () => {
  let data;
  let error;

  try {
    data = await RawFinding.findAll();
  } catch (error) {
    error = true;
  }

  return {
    data,
    error,
  };
};

export const groupedFindings = async () => {
  let data;
  let error;

  try {
    data = await GroupedFindings.findAll();
  } catch (error) {
    error = true;
  }

  return {
    data,
    error,
  };
};
