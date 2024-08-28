export default function loadFileFromBase64(base64String: string) {
  if (!base64String) {
    return null;
  }
  const byteString = atob(base64String.split(',')[1]);
  const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  console.log(new File([blob], 'PDF_파일.pdf', { type: blob.type }));
  return new File([blob], 'PDF_파일.pdf', { type: blob.type });
}
