import { Request, Response, Router } from "express";
import { Resend } from "resend";

const transactionalRouter = Router();

const resend = new Resend(process.env.RESEND_KEY);

transactionalRouter.get(
  "transactional/send",
  async (req: Request, res: Response) => {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["maxpige@gmail.com"],
      subject: "hello world",
      html: "<strong>it works!</strong>",
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ data });
  }
);

export default transactionalRouter;
