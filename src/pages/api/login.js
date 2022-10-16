import prisma from "../../lib/pisma";

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method === "POST") {
    const { username, password } = req.body;
    const users = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    if (users) {
      res.status(200).send(users);
      return;
    }
    res.status(400).send("Tài khoản hoặc mật khẩu không chính xác");;
    return;
  }
  res.status(400).send("Phương thức không được chấp nhận");
  return;
}
