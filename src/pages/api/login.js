import bcrypt from "bcrypt";
import * as jose from "jose";
import prisma from "../../lib/pisma";

const secret = process.env.SECRET || "ttphuongthao";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      const comparePass = bcrypt.compareSync(password, user.password);
      if (comparePass) {
        if (user.permisson == "admin") {
          const payload = {
            id: user.id,
            username: user.username,
            permisson: user.permisson,
            name: user.name,
          };
          const token = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .sign(new TextEncoder().encode(secret));
          res.status(200).send({ user, token });
          return;
        }
        res.status(400).send("Bạn chưa được cấp quyền truy cập");
        return;
      }
    }
    res.status(400).send("Tài khoản hoặc mật khẩu không chính xác");
    return;
  }
  res.status(400).send("Phương thức không được chấp nhận");
  return;
}
