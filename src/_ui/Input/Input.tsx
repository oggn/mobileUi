/** @jsxImportSource @emotion/react */
import React, {
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
  useCallback,
  useState,
} from "react";
import { Column } from "../flex/view/Column";
import { Txt } from "../typography/Txt";
import { TextField } from "./TextField";
import { Textarea } from "./Textarea";
import { PhoneNumberField } from "./PhoneNumberField";
import { NumbericField } from "./NumbericField";
import { VARIANTS } from "./VARIANTS";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  label?: ReactNode;
  labelEdge?: string;
  maxWidth?: number;
}

export function Input({ label, labelEdge, maxWidth, ...props }: InputProps) {
  const child = Children.only(props.children);

  const error: boolean = child.props.error ?? false;
  const errorMsg: string = child.props.errorMessage ?? undefined;
  const tolTip: string = child.props.tolTip ?? undefined;
  const theme: "light" | "dark" = child.props.theme ?? "light";
  const disabled: boolean = child.props.disabled ?? false;

  const { THEMES: THEME_VARIANTS, generateUUID } = VARIANTS({
    error,
    disabled,
  });

  const id = child.props.id ?? generateUUID();

  return (
    <Column maxWidth={maxWidth} {...props}>
      {label && (
        <label
          htmlFor={id}
          css={{
            color: error ? "#F25757" : THEME_VARIANTS[theme].label,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.75rem",
            marginBottom: "4px",

            "&:focus-within": { fontWeight: 500 },
          }}
        >
          {label}
        </label>
      )}

      {cloneElement(child, {
        id,
        ...child.props,
      })}

      {error && (
        <Txt color="#F25757" size={12} margin={{ top: 6 }}>
          {errorMsg}
        </Txt>
      )}

      {!!tolTip && !error && (
        <Txt color={THEME_VARIANTS[theme].tolTip} size={12} margin={{ top: 6 }}>
          {tolTip}
        </Txt>
      )}
    </Column>
  );
}

Input.TextField = TextField;
Input.Textarea = Textarea;
Input.PhoneNumberField = PhoneNumberField;
Input.NumbericField = NumbericField;
