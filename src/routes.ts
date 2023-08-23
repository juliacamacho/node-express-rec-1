import { Router } from "./router";

import { Session } from "./concept";
import freet from "./concepts/freet";
import user, { User } from "./concepts/user";

export const userRouter = new Router("user", user);
userRouter.get("/", user.readSafe);
userRouter.post("/", user.create);
userRouter.patch("/", user.update);
userRouter.delete("/", user.delete);

export const freetRouter = new Router("freet", freet);
freetRouter.get("/", freet.read);
freetRouter.post("/", freet.create);
freetRouter.patch("/:_id", freet.update);
freetRouter.delete("/:_id", freet.delete);

export const syncRouter = new Router("sync");
syncRouter.post("/login", login);
syncRouter.post("/logout", logout);

async function login(user: User, session: Session) {
  const u = await user.logIn(user, session);
  const f = await freet.create("Hi, I logged in!", session);
  return { msg: "Logged in and freeted!", user: u, freet: f };
}

async function logout(session: Session) {
  const u = user.logOut(session);
  const f = await freet.create("Bye bye, logging off!", session);
  return { msg: "Logged out and freeted!", user: u, freet: f };
}