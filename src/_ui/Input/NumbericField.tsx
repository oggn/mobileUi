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
} from "react";
import { GlobalInputTheme } from "../_themes/input";
import { TxtSpan } from "../typography/TxtSpan";
import { V } from "@/_ui";
import { VARIANTS } from "./VARIANTS";

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "value" | "onChange"
  > {
  as?: "s" | "m" | "l";
  theme?: "light" | "dark";
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
      theme = "light",
      as = "l",
      width = "100%",
      error,
      edge,
      disabled,
      value,
      onChange,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [displayValue, setDisplayValue] = useState<string>("");
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

    useEffect(() => {
      const formattedValue =
        typeof value === "number"
          ? value.toLocaleString()
          : value === ""
            ? ""
            : /^\d*\.?\d*$/.test(value.toString())
              ? parseFloat(value.toString()).toLocaleString()
              : "0";
      setDisplayValue(formattedValue);
    }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, "");

      if (rawValue === "") {
        setDisplayValue("");
        onChange?.({ ...e, target: { ...e.target, value: "" } });
      } else if (/^\d*\.?\d*$/.test(rawValue)) {
        setDisplayValue(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        onChange?.({ ...e, target: { ...e.target, value: rawValue } });
      } else {
        setDisplayValue("");
        onChange?.({ ...e, target: { ...e.target, value: "0" } });
      }
    };

    return (
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={displayValue}
          onChange={handleInputChange}
          autoComplete="off"
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

        {!!edge && (
          <TxtSpan
            padding={{ right: 10 }}
            color={THEME_VARIANTS?.[theme].edgeColor}
          >
            {edge}
          </TxtSpan>
        )}
      </V.Row>
    );
  }
);

export { NumbericField };
