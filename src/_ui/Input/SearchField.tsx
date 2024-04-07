/** @jsxImportSource @emotion/react */
import React, {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useId,
  useState,
} from 'react';
import { TxtTab } from '../tab/TxtTab';
import { V } from '@/_ui';
import { InputBox, InputEdgeColorTheme, InputTheme } from './themes';

type TabProps = { onClick?: any; name: string; size?: number; color?: string; disabled?: boolean };

type SizeProps = {
  width?: string | number | '100%' | '50%';
  height?: string | number | '100%';
  borderRadius?: string | number;
  padding?: string | number;
  txtSize?: number | string;
  edgeSize?: number | string;
  tolTipSize?: number;
  errorMsgSize?: number;
};

type ThemeProps = {
  backgroundColor?: string;
  borderColor?: string;
  txtColor?: string;
  edgeColor?: string;
  placeholderColor?: string;
};

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
  errorMessage?: string;
  tolTip?: boolean | string;
  tab?: TabProps;
  edge?: ReactNode;
  sizes?: SizeProps | undefined;
  themes?: {
    default?: (ThemeProps & { tolTipColor?: string }) | undefined;
    error?: (ThemeProps & { errorMsgColor?: string }) | undefined;
    disabled?: ThemeProps | undefined;
    focus?: ThemeProps | undefined;
  };
}

const SearchField = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const { disabled, tab, error, edge, sizes, themes } = props;

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);
  const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);

  const systems = { themes, focus: isFocused, error, disabled, sizes };

  //
  // numberic
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === 'number') {
      let { value } = event.target;

      const newValue = value.replace(/[^0-9]/g, '');

      if (props.maxLength && newValue.length > props.maxLength) {
        event.target.value = newValue.slice(0, props.maxLength);
      } else event.target.value = newValue;
    }

    props.onChange?.(event);
  };

  return (
    <V.Column gap={6}>
      <InputBox
        themes={themes as any}
        sizes={sizes}
        focus={isFocused}
        error={error}
        disabled={disabled}
      >
        <V.Row width='auto' padding={{ left: 12, right: 10 }}>
          <SearchIcon />
        </V.Row>

        <input
          id={props?.id ?? useId()}
          type='search'
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              document.getElementById(`${props?.id ?? useId()}-button`)?.click();
            }
          }}
          {...props}
          css={[InputTheme(systems as any), { padding: '12px 12px 12px 0' }]}
        />

        {!!tab && !edge && (
          <TxtTab
            id={`${props?.id ?? useId()}-button`}
            color={tab.color ?? '#4788f4'}
            size={tab.size ?? 14}
            onMouseEnter={!tab.disabled ? (handleFocus as any) : null}
            onMouseLeave={!tab.disabled ? (handleBlur as any) : null}
            onClick={() => tab.onClick && tab.onClick()}
            padding={{ vertical: 10, right: 10, left: 6 }}
            css={{ whiteSpace: 'nowrap' }}
            disabled={tab.disabled}
          >
            {tab.name ?? '확인'}
          </TxtTab>
        )}

        {!!edge && !tab && (
          <div
            css={{
              padding: '10px 10px 10px 6px',
              fontSize: sizes?.edgeSize ?? 13,
              color: InputEdgeColorTheme(systems as any),
              whiteSpace: 'nowrap',
            }}
          >
            {edge}
          </div>
        )}
      </InputBox>
    </V.Column>
  );
});

export { SearchField };

function SearchIcon() {
  return (
    <svg width='17' height='17' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M22.3866 21.1152C22.3466 20.9052 22.2466 20.7152 22.0966 20.5652L17.1166 15.6052L17.2966 15.3752L17.1366 15.2552L17.2866 15.3752C18.7466 13.4352 19.4066 11.0052 19.1566 8.58523C18.8966 6.16523 17.7366 3.94523 15.8966 2.34523C14.0766 0.765232 11.7066 -0.0747677 9.27655 0.00523228C6.84655 0.0952323 4.54655 1.09523 2.82655 2.81523C1.10655 4.53523 0.0965528 6.84523 0.0065528 9.26523C-0.0834472 11.6952 0.756553 14.0652 2.34655 15.9052C3.93655 17.7452 6.16655 18.9052 8.58655 19.1652C11.0066 19.4252 13.4266 18.7552 15.3766 17.3052L15.6066 17.1252L20.5666 22.1052C20.7666 22.3052 21.0366 22.4152 21.3166 22.4052H21.3266C21.5366 22.4052 21.7466 22.3352 21.9266 22.2152C22.1066 22.0952 22.2366 21.9252 22.3166 21.7352C22.3966 21.5352 22.4166 21.3252 22.3766 21.1152H22.3866ZM9.64655 17.0552C7.67655 17.0552 5.79655 16.2752 4.40655 14.8852C3.01655 13.4952 2.23655 11.6052 2.23655 9.64523C2.23655 7.68523 3.01655 5.79523 4.40655 4.40523C5.79655 3.01523 7.67655 2.23523 9.64655 2.23523C11.5866 2.27523 13.4366 3.07523 14.7966 4.45523C16.1566 5.84523 16.9166 7.70523 16.9166 9.64523C16.9166 11.5852 16.1566 13.4452 14.7966 14.8352C13.4366 16.2252 11.5866 17.0152 9.64655 17.0552Z'
        fill='#999999'
      />
    </svg>
  );
}
