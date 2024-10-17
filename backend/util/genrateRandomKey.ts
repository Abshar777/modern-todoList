import crypto from "crypto"

export default function generateRandomKey(count:number) {
  const keys = [];
  for (let i = 0; i < count; i++) {
    const key = crypto.randomBytes(16).toString('hex');
    keys.push(key);
  }
  return keys.join("");
}
