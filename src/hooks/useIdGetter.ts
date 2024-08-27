import { useLocation } from 'react-router-dom';

export default function useIdGetter() {
  const { pathname } = useLocation();
  const pathArray = pathname.split('/');
  const id = pathArray[pathArray.length - 1];
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return { id: undefined };
  return { id: parsedId };
}
