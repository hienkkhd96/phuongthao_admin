export default async function handler(req, res) {
  res.status(403).send("Lỗi xác thực người dùng");
  return;
}
