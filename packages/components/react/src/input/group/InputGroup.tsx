import React, { forwardRef, useState, useEffect } from 'react';

import { Button } from '../../button/Button';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { CommonProps } from '../../common/types';
import { Input } from '../Input';

import { labelStyle, starStyle, inputStyle, warningStyle } from './style.css';

interface InputGroupProps extends CommonProps {
  state: 'default' | 'highlight' | 'warning' | 'disabled' | 'readonly';
  type?: string;
  showButton?: boolean;
  showLabel?: boolean;
  showStar?: boolean;
  showPasswordToggle?: boolean;
  labelContent?: string;
  warningContent?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText?: string;
  buttonDisabled?: boolean;
  onButtonClick?: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonType?: 'button' | 'submit' | 'reset';
}

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  (
    {
      state = 'default',
      showButton = true,
      showLabel = true,
      showStar = true,
      showPasswordToggle = false,
      labelContent = 'label',
      warningContent = 'warning text',
      buttonText = 'Submit',
      placeholder = '',
      type,
      value,
      defaultValue = '',
      buttonDisabled = false,
      buttonType = 'submit',
      onButtonClick,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || defaultValue);

    useEffect(() => {
      setInputValue(value !== undefined ? value : defaultValue);
    }, [value, defaultValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (onButtonClick) {
        onButtonClick(e);
      }
      setInputValue('');
    };

    return (
      <Container
        as={showButton ? 'form' : 'div'}
        display="flex"
        flexDirection="column"
        className={className}
        onSubmit={handleSubmit}
        {...props}
      >
        {showLabel && (
          <Container className={labelStyle}>
            <Text>{labelContent}</Text>
            {showStar && <span className={starStyle}>*</span>}
          </Container>
        )}
        <Container display="flex" className={inputStyle}>
          <Input
            ref={ref}
            state={state}
            type={type}
            showIcon={false}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            showPasswordToggle={showPasswordToggle}
            disabled={state === 'disabled'}
            readOnly={state === 'readonly'}
          />
          {showButton && (
            <Container>
              <Button
                variant="primary"
                design="outline"
                disabled={buttonDisabled || state === 'disabled'}
                type={buttonType}
              >
                {buttonText}
              </Button>
            </Container>
          )}
        </Container>
        {state === 'warning' && <div className={warningStyle}>{warningContent}</div>}
      </Container>
    );
  }
);
