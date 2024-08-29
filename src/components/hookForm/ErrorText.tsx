import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface IProps {
  name: string;
  errors: FieldErrors<FieldValues>;
  margin?: string;
}

export default function ErrorText({ name, errors, margin }: IProps) {
  return (
    <S.ErrorText margin={margin}>
      <ErrorMessage errors={errors} name={name} />
    </S.ErrorText>
  );
}

const S = {
  ErrorText: styled.div<{ margin?: string }>`
    height: 15px;
    font-size: 12px;
    color: ${(props) => props.theme.colors.red};
    margin: ${(props) => (props.margin ? props.margin : '2px 0 0 0')};
  `,
};
