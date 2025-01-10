import { Resend } from "resend";

import { env } from "../env";

const resend = new Resend(env.RESEND_KEY);

export * from "./sign-in";
export * from "./sign-up";

export { resend };
