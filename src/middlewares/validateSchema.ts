import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export const validateSchema =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "error",
          details: error.issues.map((issue) => ({
            field: issue.path.slice(1).join(),
            message: issue.message,
          })),
        });
      }
    }
  };

// import { Request, Response, NextFunction } from "express";
// import { ZodError, ZodType } from "zod";

// export const validateSchema = (schema: ZodType) => async (req: Request, res: Response, next: NextFunction)=> {
//     try {
//         await schema.parseAsync({
//             body: req.body,
//             query: req.query,
//             params: req.params
//         })

//         return next()
//     } catch (error) {
//         if( error instanceof ZodError){
//             return res.status(400).json({
//                 error: "error",
//                 details: error.issues.map(issue => ({
//                     field: issue.path.slice(1).join(),
//                     message: issue.message
//                 }))
//             })
//         }

//         return res.status(500).json({msg: "internal server error"})
//     }
// }

// import { Request, Response, NextFunction } from "express";
// import { ZodError, ZodType } from "zod";

// export const validateSchema =
// (schema: ZodType) => async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         await schema.parseAsync({
//             body: req.body,
//             query: req.query,
//             params: req.params
//         })

//         return next();
//     } catch (error) {
//        if (error instanceof ZodError){
//         return res.status(400).json({
//             error : "Erro",
//             details: error.issues.map(issue => ({
//                 field: issue.path.slice(1).join("."),
//                 message: issue.message
//             }))
//         })
//        }

//        return res.status(500).json({
//         error: "internal server error"
//        })

//     }

// };
