import prisma from "../../../lib/pisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { idList } = req.body;
    if (!!idList.length) {
      const student = await prisma.students.deleteMany({
        where: {
          id: {
            in: idList,
          },
        },
      });
      if (student) {
        res.status(200).send(student);
        return;
      } else {
        res.status(400).send("Xóa học viên thất bại. Vui lòng thử lại");
        return;
      }
    }
    res.status(400).send("Không tìm thấy học viên. Vui lòng thử lại");
    return;
  }
}
