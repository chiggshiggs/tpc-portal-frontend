"use client";

import {
  UnstyledButton,
  Radio,
  Text,
  SimpleGrid,
  createStyles,
  Typography,
  Input,
} from "../../components";
import React from "react";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { FormBuilder } from "../../../types/Form";
import { Option, RadioInput as RadioInputType } from "../../../types/FormType";

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "background-color 150ms ease, border-color 150ms ease",
    border: `1px solid ${
      checked
        ? theme.fn.variant({ variant: "outline", color: theme.primaryColor })
            .border
        : theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .background
      : theme.colorScheme === "dark"
      ? theme.colors.dark[8]
      : theme.white,
  },

  body: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
}));

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
}

export default function RadioInput({
  renderElement,
  formKey,
  formBuilderSchema,
  basePath,
}: {
  renderElement: RadioInputType;
  formKey: string;
  formBuilderSchema: FormBuilder;
  basePath: string;
}) {
  const { error, visible, inputState, captureRadioInput } = useForm({
    formElement: renderElement,
    basePath,
    formKey,
    formBuilderSchema,
  });

  // Checkbox
  function RadioInputElement({
    title,
    description,
    className,
    option,
  }: ImageCheckboxProps & {
    option: Option;
    optionIndex: number;
  } & Omit<
      React.ComponentPropsWithoutRef<"button">,
      keyof ImageCheckboxProps
    >) {
    const { classes, cx } = useStyles({
      checked: inputState === option.key ? true : false,
    });

    const handleChange = () => {
      captureRadioInput(option.key as string);
    };

    return (
      <UnstyledButton
        onClick={handleChange}
        className={cx(classes.button, className)}
      >
        <Radio
          onChange={() => {}} // hack to shut error
          checked={inputState === option.key ? true : false}
          tabIndex={-1}
          // styles={{ input: { cursor: "pointer" } }}
        />
        <div className={classes.body}>
          <Typography weight={500} size="sm" sx={{ lineHeight: 1 }}>
            {title}
          </Typography>
          <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
            {description}
          </Text>
        </div>
      </UnstyledButton>
    );
  }

  return (
    <div className="mt-3 mb-3">
      <Input.Label
        className="font-bold"
        required={(renderElement.required as boolean) || false}
      >
        {renderElement.label}
      </Input.Label>
      <Input.Description>{renderElement.description}</Input.Description>
      <SimpleGrid
        cols={4}
        className="mt-1"
        breakpoints={[
          { maxWidth: "xl", cols: 4 },
          { maxWidth: "lg", cols: 3 },
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {renderElement.options.map((option, optionIndex) => (
          <RadioInputElement
            option={option}
            optionIndex={optionIndex}
            title={option.label as string}
            description={(option.description as string) || ""}
            key={option.key as React.Key}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
