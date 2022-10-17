import prisma from "../../../lib/pisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log(123);
    const query = req.query || null;
    const customers = await prisma.customers.findMany({
      where: { ...query, is_removed: false },
      include: {
        Users: true,
      },
      orderBy: {
        created: "desc",
      },
    });
    res.status(200).send(customers);
    return;
  }
  if (req.method === "POST") {
    const data = req.body;
    const customer = await prisma.customers.create({
      data: data,
    });
    if (customer) {
      res.status(200).send(customer);
    } else {
      res.status(400).send("Thêm khách hàng thất bại. Vui lòng thử lại");
    }
    return;
  }
  if (req.method === "PUT") {
    const { id, ...rest } = req.body;
    const customer = await prisma.customers.update({
      where: { id: id },
      data: { ...rest },
    });
    if (customer) {
      res.status(200).send(customer);
    } else {
      res.status(400).send("Không tìm thấy khách hàng. Vui lòng thử lại");
    }
    return;
  }
}
