export default function useRandomColorGenerator() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return { color: `rgb(${red}, ${green}, ${blue})` };
}
