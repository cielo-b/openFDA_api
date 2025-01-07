import { Request, Response } from "express";
import axios from "axios";
import { RecommendationResponse } from "../types";
import { logger } from "../utils/logger";

export const getRecs = async (req: Request, res: Response): Promise<void> => {
  const { input } = req.body;
  try {
    const fdaQuery = encodeURIComponent(
      `brand_name:${input} OR active_ingredient:${input} OR route:${input} OR pharm_class:${input}`
    );

    const medicationResponse = await axios.get(
      `https://api.fda.gov/drug/ndc.json?search=${fdaQuery}&limit=20`
    );

    const testsResponse = await axios.get(
      `https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${encodeURIComponent(
        input
      )}&maxEntries=10`
    );

    const medications = medicationResponse.data.results || [];
    const tests = testsResponse.data.results || [];

    if (medications.length === 0 && tests.length === 0) {
      res
        .status(404)
        .json({ message: "No recommendations found for the given input." });
      return;
    }

    const recs: RecommendationResponse = {
      medications,
      tests,
    };

    res.status(200).json(recs);
  } catch (error) {
    logger((error as Error).message, "controller");
    res.status(500).json({ error: (error as Error).message });
  }
};
