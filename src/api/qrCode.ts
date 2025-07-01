import QRCode from "qrcode";

export async function getQrCodeFromId(
  id: string,
  url: string,
): Promise<string> {
  const regex = /^(https?:\/\/[^\/]+)/;
  const publicUrl = url.match(regex)![1];

  return QRCode.toDataURL(`${publicUrl}/api/resources/${id}`);
}
