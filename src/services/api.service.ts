import axios, { AxiosResponse } from "axios";
import { logger } from "../utils/logger";

export const fetch = async (url: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response;
  } catch (error) {
    logger((error as Error).message, "service");
    throw new Error((error as Error).message);
  }
};
