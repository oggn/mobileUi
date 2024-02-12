/** @jsxImportSource @emotion/react */
import React, {
  ForwardedRef,
  ReactNode,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Row } from '../flex/Row';
import { GlobalInputTheme } from '../_themes/input';
import { ScrollTheme, ScrollType } from '../_themes/scroll';
import { TxtTab } from '../tab/TxtTab';
import { Column } from '../flex/Column';
import { TxtSpan } from '../typography/TxtSpan';

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, ScrollType {
  theme?: 'light' | 'dark';
  autoRaise?: boolean;
  error?: boolean;
  errorMessage?: boolean | string;
  tolTip?: string;
  edge?: ReactNode;
  textCountActive?: boolean;
  tab?: {
    onClick?: any;
    name: string;
    size?: number;
    color?: string;
    disabled?: boolean;
  };
}

const Textarea = forwardRef((props: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const { value, disabled, autoRaise, scroll } = props;
  const { theme = 'light', error, tab, rows = 1, textCountActive, edge } = props;

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);
  const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);

  useEffect(() => {
    const handleRasie = () => {
      if (value && value !== '' && ref && 'current' in ref && ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
      } else if (ref && 'current' in ref && ref.current) {
        ref.current.style.height = 'auto';
      }
    };

    if (autoRaise) handleRasie();
  }, [value, ref, autoRaise]);

  const VARIANTS = {
    light: {
      solidColor: !error && isFocused ? '#0085FF' : '#e2e2e2' && error ? '#FF6767' : '#e2e2e2',
      color: disabled ? '#797979' : '#555',
      placeholder: '#ccc',
      activeColor: !error && isFocused ? '#f8f9fc' : '#fff',
      edgeColor: '#999',
      disabledColor: '#f8f8f8',
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

  const inputT = GlobalInputTheme() as any;
  const scrollT = ScrollTheme({
    scroll: {
      type: rows >= 2 ? 'auto' : 'visible',
      bar: scroll?.bar ?? rows >= 2,
    },
  }) as any;

  return (
    <Column gap={6}>
      <Row
        align="end"
        minHeight={50}
        border={{ solid: 1, position: 'all', color: VARIANTS[theme].solidColor }}
        borderRadius={14}
        backgroundColor={disabled ? VARIANTS[theme].disabledColor : VARIANTS[theme].activeColor}
        transitionTime={0.5}
      >
        <textarea
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={rows}
          css={{
            ...inputT,
            ...scrollT,
            width: '100%',
            height: '100%',
            color: VARIANTS[theme].color,
            padding: '13px',
            fontSize: '0.938rem',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            resize: 'none',
            '::placeholder': { color: VARIANTS[theme].placeholder },
          }}
          {...props}
        />

        {!!tab && (
          <TxtTab
            color={tab.color ?? '#4788f4'}
            size={tab.size ?? 14}
            onClick={() => {
              if (tab.onClick) {
                tab.onClick();
              } else return;
            }}
            padding={{ vertical: 10, right: 10, left: 6 }}
            css={{ whiteSpace: 'nowrap', minHeight: 48 }}
            disabled={tab.disabled}
            onMouseEnter={!tab.disabled ? (handleFocus as any) : null}
            onMouseLeave={!tab.disabled ? (handleBlur as any) : null}
          >
            {tab.name ?? '확인'}
          </TxtTab>
        )}
      </Row>

      {textCountActive && (
        <TxtSpan color="#999" size={12}>
          {typeof props.value === 'string' ? props.value.length : 0}
          {'/' + props.maxLength}
        </TxtSpan>
      )}

      {!!edge && (
        <TxtSpan padding={{ right: 10 }} color={VARIANTS[theme].edgeColor}>
          {edge}
        </TxtSpan>
      )}
    </Column>
  );
});

export { Textarea };
