import jwt from "jsonwebtoken";

export const generateJWTToken = (uid: string = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_PRIVATE_KEY as string,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err), reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
