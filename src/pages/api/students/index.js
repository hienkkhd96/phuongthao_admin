import prisma from "../../../lib/pisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query || null;
    const students = await prisma.students.findMany({
      where: { ...query, is_removed: false },
      include: {
        Users: true,
      },
      orderBy: {
        created: "desc",
      },
    });
    res.status(200).send(students);
    return;
  }
  if (req.method === "POST") {
    const data = req.body;
    const student = await prisma.students.create({
      data: data,
    });
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(400).send("Thêm học viên thất bại. Vui lòng thử lại");
    }
    return;
  }
  if (req.method === "PUT") {
    const { id, ...rest } = req.body;
    const student = await prisma.students.update({
      where: { id: id },
      data: { ...rest },
    });
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(400).send("Không tìm thấy học viên. Vui lòng thử lại");
    }
    return;
  }
}
