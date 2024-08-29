import * as yup from 'yup';
import { regex } from './regex';

const SIGN_IN_ID_VALID_TEXT = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 입력 가능합니다.';
const EMAIL_VALID_TEXT = '이메일 형식을 확인해주세요';
const PASSWORD_VALID_TEXT = '영 대소문자,특수문자,숫자를 포함한 8자~16자';
const PASSWORD_MATCH_TEXT = '비밀번호와 일치해야 합니다.';
const PHONE_NUMBER_VALID_TEXT = '010으로 시작하는 "-"를 제외한 숫자만 입력 가능합니다';
const LOCAL_NUMBER_VALID_TEXT = '"-"를 제외한 지역 전화번호만 입력 가능합니다';

const REQUIRED_NUMBER_VALID_TEXT = '숫자만 입력 가능합니다.';
const REQUIRED_OPTION_VALID_TEXT = '필수항목';
const REQUIRED_AGREE_TEXT = '동의해주셔야 합니다.';
const REQUIRED_INPUT_VALID_TEXT = '필수입력';
const REQUIRED_IMAGE_VALID_TEXT = '이미지를 등록해주세요';
const REQUIRED_MORE_ONE_IMAGE_VALID_TEXT = '이미지를 등록해주세요';
const REQUIRED_TWO_DECIMAL_NUMBER_VALID_TEXT = '소수점 2자리 이내 숫자만 입력 가능';
const REQUIRED_ENG_WITH_DASH_AND_NUMBER_VALID_TEXT = '영문필수, 숫자와 _만 입력 가능';

const KO_VALID_TEXT_1 = '모음 입력제한';
const KO_VALID_TEXT_2 = '자음 입력제한';
const KO_VALID_TEXT_3 = '한글은 허용되지않습니다';
const KO_VALID_TEXT_4 = '한글입력만 허용됩니다';
const FIRST_SPACES_VALID_TEXT = '첫글자 공백';
const LAST_SPACES_VALID_TEXT = '마지막글자 공백';
const SPACES_VALID_TEXT_2 = '띄어쓰기 불가';
const SPECIAL_VALID_TEXT_1 = '특수문자는 허용되지않습니다';

const MORE_TEXT = (more: number) => `${more}글자 이상`;
const LESS_TEXT = (less: number) => `${less}글자 이하`;
const LESS_THAN_OR_EQUAL_NUMBER = (less: number) => `${less} 이하 숫자만 가능`;
const LESS_NUMBER = (less: number) => `${less} 미만 숫자만 가능`;
const MORE_THAN_OR_EQUAL_NUMBER = (less: number) => `${less} 이상 숫자만 가능`;
const MORE_NUMBER = (less: number) => `${less} 초과 숫자만 가능`;
const MORE_IMAGE = (more: number) => `${more}개 이상`;
const LESS_IMAGE = (less: number) => `${less}개 이하`;

yup.setLocale({
  mixed: {
    required: REQUIRED_INPUT_VALID_TEXT,
  },
  number: {
    positive: '양수값을 입력해주세요',
    max: '999이하로 입력해주세요',
    min: '1이상 입력해주세요',
  },
});

export const validation = {
  /**********************************************    Simple Validation      **************************************************/
  SIGN_IN_ID: yup.string().required().matches(regex.signInId, SIGN_IN_ID_VALID_TEXT),
  /**이메일. */
  EMAIL: yup.string().required().email(EMAIL_VALID_TEXT),
  /**비밀번호. */
  PASSWORD: yup.string().required().matches(regex.password, PASSWORD_VALID_TEXT),
  /**비밀번호 확인. ⚠️WARNING! 확인대상 비밀번호는 반드시 password라고 폼에 작성할 것.*/
  PASSWORD_CONFIRM: yup
    .string()
    .required()
    .test('password-match', PASSWORD_MATCH_TEXT, function (value) {
      return value === this.resolve(yup.ref('password'));
    }),
  /**핸드폰 번호 유효성 검사. */
  PHONE_NUMBER: yup.string().required().matches(regex.phone, PHONE_NUMBER_VALID_TEXT),
  LOCAL_NUMBER: yup.string().required().matches(regex.localNumber, LOCAL_NUMBER_VALID_TEXT),
  IMAGE_FILES: yup.mixed().required(REQUIRED_MORE_ONE_IMAGE_VALID_TEXT),
  IMAGE_FILE: yup.array().min(1, REQUIRED_IMAGE_VALID_TEXT).required(),
  OPTION_IMAGE_FILE: yup.array().min(0),
  IMAGE_FILE_NOT_REQUIRED: yup.array(),
  REQUIRED_SELECT_BOX: yup.string().required(REQUIRED_OPTION_VALID_TEXT),
  REQUIRED_SELECT_BOX_2: yup.mixed().required(REQUIRED_OPTION_VALID_TEXT),
  REQUIRED_DATE: yup.string().required(),
  /**필수 ) MAN or WOMAN값. */
  REQUIRED_GENDER: yup.string().required().oneOf(['MAN', 'WOMAN'], REQUIRED_OPTION_VALID_TEXT),
  /**필수 ) Y or N값. */
  REQUIRED_YES_OR_NO: yup.string().required().oneOf(['Y', 'N'], REQUIRED_OPTION_VALID_TEXT),
  /**필수 ) Y or N값. 반드시 Y를 체크해야 유효성 통과. */
  REQUIRED_YES_CHECK: yup
    .string()
    .required()
    .oneOf(['Y', 'N'], REQUIRED_OPTION_VALID_TEXT)
    .test('check-yes', REQUIRED_AGREE_TEXT, (value) => value === 'Y'),
  REQUIRED_ARRAY: yup.array().min(1, REQUIRED_INPUT_VALID_TEXT).required(),
  /**필수 ) 숫자만 입력. 숫자가 아닌타입 입력시 에러발생. */
  REQUIRED_NUMBER: yup.number().required().typeError(REQUIRED_NUMBER_VALID_TEXT),
  OPTION_NUMBER: yup.number().typeError(REQUIRED_NUMBER_VALID_TEXT).notRequired(),
  /**********************************************    Combined Validation      **************************************************/
  /**필수 ) 0부터 100까지의 숫자 */
  REQUIRED_RATE_NUMBER: yup
    .number()
    .typeError(REQUIRED_NUMBER_VALID_TEXT)
    .min(0, MORE_THAN_OR_EQUAL_NUMBER(0))
    .max(100, LESS_THAN_OR_EQUAL_NUMBER(100))
    .required(),
  /**필수) 소수점 2자리 이내 */
  REQUIRED_TWO_DECIMAL_NUMBER: yup.string().required().matches(regex.twoDecimalPlaces, REQUIRED_TWO_DECIMAL_NUMBER_VALID_TEXT),

  /**선택 ) 텍스트 - 공백체크(X) 특수문자(X) 영문(O) 한글(X)*/
  TEXT_1: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup.string().min(minLength, MORE_TEXT(minLength)).max(maxLength, LESS_TEXT(maxLength)),

  /**선택 ) 텍스트 띄어쓰기(X) 영문(O), 숫자(0)*/
  TEXT_2: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .matches(regex.tagTitleEng, REQUIRED_ENG_WITH_DASH_AND_NUMBER_VALID_TEXT)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
  /**필수 ) 텍스트 - 공백체크(O)*/
  REQUIRED_TEXT_1: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .matches(regex.firstSpace, FIRST_SPACES_VALID_TEXT)
      .matches(regex.lastSpace, LAST_SPACES_VALID_TEXT)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength))
      .required(),

  /**필수 ) 텍스트 - 공백체크(O) 특수문자(X)*/
  REQUIRED_TEXT_2: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .required()
      .matches(regex.firstSpace, FIRST_SPACES_VALID_TEXT)
      .matches(regex.lastSpace, LAST_SPACES_VALID_TEXT)
      .matches(regex.special_1, SPECIAL_VALID_TEXT_1)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),

  /**필수 ) 텍스트 - 공백체크(O) 특수문자(X) 한글(O) 영문(O)*/
  REQUIRED_TEXT_3: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .required()
      .matches(regex.firstSpace, FIRST_SPACES_VALID_TEXT)
      .matches(regex.lastSpace, LAST_SPACES_VALID_TEXT)
      .matches(regex.special_1, SPECIAL_VALID_TEXT_1)
      .matches(regex.gather, KO_VALID_TEXT_1)
      .matches(regex.consonant, KO_VALID_TEXT_2)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
  /**필수 ) 텍스트 - 공백체크(O) 자음/모음(X) 특수문자(O) 한글(O) 영문(O)*/
  REQUIRED_TEXT_4: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .required()
      .matches(regex.firstSpace, FIRST_SPACES_VALID_TEXT)
      .matches(regex.lastSpace, LAST_SPACES_VALID_TEXT)
      .matches(regex.gather, KO_VALID_TEXT_1)
      .matches(regex.consonant, KO_VALID_TEXT_2)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
  /**필수 ) 텍스트 - 공백체크(O) 특수문자(O) 영문(O) 한글(X)*/
  REQUIRED_TEXT_5: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .matches(regex.firstSpace, FIRST_SPACES_VALID_TEXT)
      .matches(regex.lastSpace, LAST_SPACES_VALID_TEXT)
      .matches(regex.koreanNot, KO_VALID_TEXT_3)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength))
      .required(),
  /**필수 ) 텍스트 - 공백체크(O) 특수문자(X) 영문(X) 한글(O)*/
  REQUIRED_TEXT_6: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .required()
      .matches(regex.firstSpace, FIRST_SPACES_VALID_TEXT)
      .matches(regex.lastSpace, LAST_SPACES_VALID_TEXT)
      .matches(regex.gather, KO_VALID_TEXT_1)
      .matches(regex.consonant, KO_VALID_TEXT_2)
      .matches(regex.koreanOnly, KO_VALID_TEXT_4)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),

  /**필수 ) n 이상의 숫자*/
  REQUIRED_NUMBER_2: ({ minNum }: { minNum: number }) =>
    yup.number().typeError(REQUIRED_NUMBER_VALID_TEXT).required().moreThan(minNum, MORE_THAN_OR_EQUAL_NUMBER(minNum)),

  /**필수 ) n 미만의 숫자*/
  REQUIRED_NUMBER_3: ({ maxNum }: { maxNum: number }) =>
    yup
      .number()
      .typeError(REQUIRED_NUMBER_VALID_TEXT)
      .required()
      .lessThan(maxNum + 1, LESS_NUMBER(maxNum)),

  /**필수 ) n 초과 m 이하의 숫자*/
  REQUIRED_NUMBER_4: ({ minNum, maxNum }: { minNum: number; maxNum: number }) =>
    yup
      .number()
      .typeError(REQUIRED_NUMBER_VALID_TEXT)
      .required()
      .lessThan(maxNum, LESS_THAN_OR_EQUAL_NUMBER(maxNum))
      .moreThan(minNum, MORE_NUMBER(minNum)),

  /**필수 ) n 초과의 숫자*/
  REQUIRED_NUMBER_5: ({ minNum }: { minNum: number }) =>
    yup.number().typeError(REQUIRED_NUMBER_VALID_TEXT).required().moreThan(minNum, MORE_NUMBER(minNum)),

  /**선택 ) 텍스트 - 자음/모음(X) 특수문자(O) 한글(O) 영문(O)*/
  OPTION_TEXT: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .matches(regex.gather, KO_VALID_TEXT_1)
      .matches(regex.consonant, KO_VALID_TEXT_2)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),

  /**선택 ) 텍스트 - 자음/모음(X) 특수문자(X) 띄어쓰기(X) 한글(O)*/
  OPTION_TEXT_2: () =>
    yup
      .string()
      .matches(regex.gather, KO_VALID_TEXT_1)
      .matches(regex.consonant, KO_VALID_TEXT_2)
      .matches(regex.allSpace, SPACES_VALID_TEXT_2)
      .matches(regex.koreanOnly, KO_VALID_TEXT_4),

  /**선택 ) 텍스트 - 특수문자(O) 한글(X) 영문(O)*/
  OPTION_TEXT_3: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup.string().matches(regex.koreanNot2, KO_VALID_TEXT_3).min(minLength, MORE_TEXT(minLength)).max(maxLength, LESS_TEXT(maxLength)),

  /**선택 ) 이미지 - 이미지 개수 제한*/
  IMAGE_FILE_LENGTH: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup.array().min(minLength, MORE_IMAGE(minLength)).max(maxLength, LESS_IMAGE(maxLength)),
};
