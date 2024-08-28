export default function changeFileToBase64(file: File, callback: (base64String: string) => void) {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (!event.target) return;
    const base64String = event.target.result;
    if (!base64String) return;
    callback(base64String as string);
  };
  reader.readAsDataURL(file);
}
