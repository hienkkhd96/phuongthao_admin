import * as jose from "jose";
const secret = process.env.SECRET || "ttphuongthao";

const checkJwtIsValid = async (request) => {
  try {
    const token = request.cookies.get('token')
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(secret));
    if (payload.id) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};
export default checkJwtIsValid;
