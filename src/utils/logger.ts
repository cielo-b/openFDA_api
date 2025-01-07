export const logger = (message: string, service: string): void => {
  console.log(`[${new Date().toISOString()}] : message ==> ${message} at ${service}`);
};
