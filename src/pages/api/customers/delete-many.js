import prisma from "../../../lib/pisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { idList } = req.body;
    if (!!idList.length) {
      const customer = await prisma.customers.deleteMany({
        where: {
          id: {
            in: idList,
          },
        },
      });
      if (customer) {
        res.status(200).send(customer);
        return;
      } else {
        res.status(400).send("Xóa khách hàng thất bại. Vui lòng thử lại");
        return;
      }
    }
    res.status(400).send("Không tìm thấy khách hàng. Vui lòng thử lại");
    return;
  }
}
