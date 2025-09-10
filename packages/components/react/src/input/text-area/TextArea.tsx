import { forwardRef, ChangeEvent } from 'react';
import { Container } from '../../common/container/Container';
import { CommonProps } from '../../common/types';
import { inputStyle } from '../style.css';

interface TextAreaProps extends CommonProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, value, onChange, placeholder = '내용을 작성하세요.', ...props }, ref) => {
    return (
      <Container display="flex" width={'100%'} className={className}>
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputStyle}
          style={{ padding: '0px' }}
          {...props}
        />
      </Container>
    );
  },
);

TextArea.displayName = 'TextArea';
