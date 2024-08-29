import * as yup from 'yup';
import { validation } from '@/utils/validate/validation';

/** PDF 제목변경 */
const pdfTitleSchema = yup.object({
  title: validation.REQUIRED_TEXT_4({ minLength: 1, maxLength: 15 }),
});

export const schema = {
  pdfTitleSchema,
};
