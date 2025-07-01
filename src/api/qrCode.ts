import path from "path";
import QRCode from "qrcode";

export async function getQrCodeFromId(
  id: string,
  url: string,
): Promise<string> {
  const regex = /^(https?:\/\/[^\/]+)/;
  const publicUrl = url.match(regex)![1];
  console.log(publicUrl);

  return QRCode.toDataURL(`${publicUrl}/ressource/${id}`);
}

export async function generateQrCode(body: object, publicUrl: string) {
  const id = body.id;
  const qrPath = path.join(process.cwd(), "public", "ressource", `${id}.png`);
  QRCode.toFile(qrPath, `${publicUrl}/ressource/${id}`);
}
