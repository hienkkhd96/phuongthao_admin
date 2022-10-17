import * as jose from "jose";
const secret = process.env.SECRET || "ttphuongthao";

const checkJwtIsValid = async (request) => {
  try {
    const auth = request.headers.get("authorization");
    const token = auth ? auth.split(" ")[auth.split(" ").length - 1] : null;
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(secret));
    if (payload.id) {
      return true;
    } else return false
  } catch (error) {
    return false;
  }
};
export default checkJwtIsValid;
