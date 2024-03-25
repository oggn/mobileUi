/** @jsxImportSource @emotion/react */
import React, {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { GlobalInputTheme } from "../_themes/input";
import { V } from "@/_ui";
import { VARIANTS } from "./VARIANTS";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  as?: "s" | "m" | "l";
  theme?: "light" | "dark";
  width?: number | string;
  error?: boolean;
  tolTip?: boolean | string;
  inputSize?: number;
}

const PhoneNumberField = forwardRef(
  (
    {
      theme = "light",
      as = "l",
      width = "100%",
      error,
      disabled,
      value: externalValue,
      onChange: externalOnChange,
      tolTip,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      String(externalValue) || ""
    );
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = useCallback(() => setIsFocused(true), [isFocused]);
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused]);

    //
    // themes
    const {
      THEMES: THEME_VARIANTS,
      SIZES: SIZE_VARIANTS,
      generateUUID,
    } = VARIANTS({
      error,
      disabled,
      isFocused,
    });

    // 외부에서 전달된 value 값이 변경되면, 내부 state도 업데이트합니다.
    useEffect(() => {
      if (externalValue) {
        setInternalValue(String(externalValue));
      }
    }, [externalValue]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value.trim().replace(/[^0-9]/g, "");
      let formattedVal = inputVal;
      if (inputVal.length === 9) {
        formattedVal = inputVal.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
      } else if (inputVal.length === 10) {
        formattedVal = inputVal.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (inputVal.length === 11) {
        formattedVal = inputVal.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      }

      setInternalValue(formattedVal);

      if (externalOnChange) {
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: formattedVal,
          },
        } as ChangeEvent<HTMLInputElement>;
        externalOnChange(newEvent);
      }
    };

    return (
      <V.Column gap={6}>
        <V.Row
          width={SIZE_VARIANTS?.[as].width as "auto" | "100%"}
          maxWidth={width}
          align="center"
          minHeight={SIZE_VARIANTS?.[as].height}
          maxHeight={SIZE_VARIANTS?.[as].height}
          border={{
            solid: 1,
            position: "all",
            color: THEME_VARIANTS?.[theme].solidColor,
          }}
          borderRadius={SIZE_VARIANTS?.[as].br}
          backgroundColor={
            disabled
              ? THEME_VARIANTS?.[theme].disabledColor
              : THEME_VARIANTS?.[theme].activeColor
          }
          transitionTime={0.5}
        >
          <input
            ref={ref}
            id={generateUUID()}
            type="text"
            autoComplete="off"
            maxLength={13}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={internalValue}
            onChange={handleInputChange}
            {...props}
            css={{
              ...(GlobalInputTheme() as any),
              width: SIZE_VARIANTS?.[as].width,
              height: "100%",
              color: THEME_VARIANTS?.[theme].color,
              fontSize: SIZE_VARIANTS?.[as].txtSize,
              padding: SIZE_VARIANTS?.[as].padding,
              outline: "none",
              border: "none",
              resize: "none",
              backgroundColor: "transparent",
              borderRadius: SIZE_VARIANTS?.[as].br,
              "::placeholder": { color: THEME_VARIANTS?.[theme].placeholder },
            }}
          />
        </V.Row>
      </V.Column>
    );
  }
);

export { PhoneNumberField };
