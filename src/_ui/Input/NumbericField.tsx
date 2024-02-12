/** @jsxImportSource @emotion/react */
import React, {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Row } from '../flex/Row';
import { GlobalInputTheme } from '../_themes/input';
import { TxtSpan } from '../typography/TxtSpan';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
  as?: 's' | 'm' | 'l';
  theme?: 'light' | 'dark';
  width?: number | string;
  error?: boolean;
  edge?: ReactNode;
  inputSize?: number;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NumbericField = forwardRef(
  (
    {
      theme = 'light',
      as = 'l',
      width = '100%',
      error,
      edge,
      disabled,
      value,
      onChange,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);

    const [displayValue, setDisplayValue] = useState<string>('');

    useEffect(() => {
      const formattedValue =
        typeof value === 'number'
          ? value.toLocaleString()
          : value === ''
            ? ''
            : /^\d*\.?\d*$/.test(value.toString())
              ? parseFloat(value.toString()).toLocaleString()
              : '0';
      setDisplayValue(formattedValue);
    }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, '');

      if (rawValue === '') {
        setDisplayValue('');
        onChange?.({ ...e, target: { ...e.target, value: '' } });
      } else if (/^\d*\.?\d*$/.test(rawValue)) {
        setDisplayValue(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        onChange?.({ ...e, target: { ...e.target, value: rawValue } });
      } else {
        setDisplayValue('');
        onChange?.({ ...e, target: { ...e.target, value: '0' } });
      }
    };

    const THEME_VARIANTS = {
      light: {
        solidColor: !error && isFocused ? '#1889F1' : '#e2e2e2' && error ? '#FF6767' : '#e2e2e2',
        color: disabled ? '#797979' : '#555',
        placeholder: '#ccc',
        activeColor: !error && isFocused ? '#f8f9fc' : '#fff',
        edgeColor: '#999',
        disabledColor: '#f4f4f4',
      },
      dark: {
        solidColor: !error && isFocused ? '#777' : '#444' && error ? '#FF6767' : '#444',
        color: disabled ? '#888' : '#bbb',
        placeholder: '#777',
        activeColor: !error && isFocused ? '#222' : 'transparent',
        edgeColor: '#888',
        disabledColor: '#101010',
      },
    } as const;

    const SIZE_VARIANTS = {
      s: { width: 'auto', txtSize: '0.813em', height: 38, padding: 8, br: 10 },
      m: { width: '100%', txtSize: '0.875em', height: 44, padding: '10px 11px', br: 12 },
      l: { width: '100%', txtSize: '0.938em', height: 50, padding: 13, br: 14 },
    } as const;

    const inputT = GlobalInputTheme() as any;

    return (
      <Row
        width={SIZE_VARIANTS[as].width}
        maxWidth={width}
        align="center"
        minHeight={SIZE_VARIANTS[as].height}
        maxHeight={SIZE_VARIANTS[as].height}
        border={{ solid: 1, position: 'all', color: THEME_VARIANTS[theme].solidColor }}
        borderRadius={SIZE_VARIANTS[as].br}
        backgroundColor={
          disabled ? THEME_VARIANTS[theme].disabledColor : THEME_VARIANTS[theme].activeColor
        }
        transitionTime={0.5}
      >
        <input
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={displayValue}
          onChange={handleInputChange}
          autoComplete="off"
          {...props}
          css={{
            ...inputT,
            width: SIZE_VARIANTS[as].width,
            height: '100%',
            color: THEME_VARIANTS[theme].color,
            fontSize: SIZE_VARIANTS[as].txtSize,
            padding: SIZE_VARIANTS[as].padding,
            outline: 'none',
            border: 'none',
            resize: 'none',
            backgroundColor: 'transparent',
            borderRadius: SIZE_VARIANTS[as].br,
            '::placeholder': { color: THEME_VARIANTS[theme].placeholder },
          }}
        />

        {!!edge && (
          <TxtSpan padding={{ right: 10 }} color={THEME_VARIANTS[theme].edgeColor}>
            {edge}
          </TxtSpan>
        )}
      </Row>
    );
  },
);

export { NumbericField };
