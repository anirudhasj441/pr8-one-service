import express from "express";

import serverless from "serverless-http";


const app = express();

app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Hello from root!",
    });
  });

  
export const handler = serverless(app);

// export default handler