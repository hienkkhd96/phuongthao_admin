import bcrypt from "bcrypt";
import prisma from "../../../lib/pisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query || null;
    const users = await prisma.users.findMany({
      where: query,
    });
    res.status(200).send(users);
    return;
  }
  if (req.method === "POST") {
    const body = req.body;
    const { username, email, mobile, password } = body;
    const getByUsername = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    const getByEmail = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    const getByMobile = await prisma.users.findFirst({
      where: {
        mobile,
      },
    });
    if (getByUsername) {
      res.status(400).send("Tên tài khoản đã tồn tại");
      return;
    }
    if (getByEmail) {
      res.status(400).send("Email đã tồn tại");
      return;
    }
    if (getByMobile) {
      res.status(400).send("Số điện thoại đã tồn tại");
      return;
    }
    // username:string required
    // passwrord:string required
    // username:string required
    // username:string required
    // permisson:admin/staff defautl:staff
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    if(hash) {
      const hasedData = {...body,password:hash}
      const data = await prisma.users.create({
        data: hasedData,
      });
      if (data) {
        res.status(200).send(data);
        return;
      }
    }
    return res.status(400).send("Đăng ký thất bại");
  }
}
