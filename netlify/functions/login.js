import crypto from "crypto";

export async function handler(event) {
  const { user, pass } = JSON.parse(event.body);

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH;

  const hash = crypto.createHash("sha256").update(pass).digest("hex");

  if (user === ADMIN_USER && hash === ADMIN_PASS_HASH) {
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ ok: false, error: "Credenciales incorrectas" })
  };
}
