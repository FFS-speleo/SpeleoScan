import path from "path";
import QRCode from "qrcode";

const { PUBLIC_URL: publicUrl } = process.env;

export function getQrCodeFromId(id: string): string {
  return `/ressource/${id}.png`;
}

export async function generateQrCode(body: object) {
  const id = body.id;
  const qrPath = path.join(process.cwd(), "public", "ressource", `${id}.png`);
  QRCode.toFile(qrPath, `${publicUrl}/ressource/${id}`);
}
