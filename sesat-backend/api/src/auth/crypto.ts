import * as crypto from "crypto";

const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

export const hash = (text: string) => {
  const hash = crypto.createHash("sha1");
  hash.update(text);
  return hash.digest("hex");
};

export const encrypt = (text: string) => {
  const key = Buffer.from(process.env.SECRET_KEY);

  const cypher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([cypher.update(text), cypher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash) => {
  const decypher = crypto.createDecipheriv(
    algorithm,
    process.env.SECRET_KEY,
    Buffer.from(hash.iv, "hex")
  );

  const decrypted = Buffer.concat([
    decypher.update(Buffer.from(hash.content, "hex")),
    decypher.final(),
  ]);

  return decrypted.toString();
};
