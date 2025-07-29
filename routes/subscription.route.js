import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/",(req,res) => res.send({title: "Get all subscriptions"}));
subscriptionRouter.get("/:id",(req,res) => res.send({title: "Get details of subscription"}));
subscriptionRouter.post("/",(req,res) => res.send({title: "Create subscription"}));
subscriptionRouter.put("/:id",(req,res) => res.send({title: "update subscription"}));
subscriptionRouter.delete("/:id",(req,res) => res.send({title: "delete subscription"}));
subscriptionRouter.get("/user/:id",(req,res) => res.send({title: "Get all user subscription"}));
subscriptionRouter.put("/:id/cancel",(req,res) => res.send({title: "Cancel all user subscription"}));
subscriptionRouter.get("/upcoming-renewals",(req,res) => res.send({title: "Get Upcoming subscription"}));

export default subscriptionRouter;