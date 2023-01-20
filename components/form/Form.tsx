"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Types
import { FormBuilder, RepeatableSection, Section } from "../../types/Form";

// Components
import { Typography, Button, useMantineTheme } from "../components";
const Renderer = dynamic(import("./Renderer"));

// Icons
import { IconCheck } from "@tabler/icons";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  initializeFormState,
  selectForm,
  trySubmit,
} from "../../store/states/formSlice";
import { FormElement } from "../../types/FormType";
import useExportableFormData from "../../hooks/useExportableFormData";
import { StepperComponent } from "./Stepper";
import Viewer from "./Viewer";

function Form({
  schema,
  children,
  successText,
  successDescription,
}: {
  schema: FormBuilder;
  children?: React.ReactNode;
  successText?: string;
  successDescription?: string;
}) {
  const formState = useSelector(selectForm);
  const { exportableFormState, checkValidated } = useExportableFormData({
    formKey: schema.key as string,
  });
  const theme = useMantineTheme();
  const [step, setStep] = useState(1);

  console.log(formState, exportableFormState);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      initializeFormState({
        formKey: schema.key as string,
        formBuilderSchema: schema,
      })
    );
  }, []);

  const handleSubmit = () => {
    if (step === 1) dispatch(trySubmit({ formKey: schema.key as string }));
    if (checkValidated()) setStep(step + 1);
  };

  return (
    <div>
      <div className="mb-5">
        <StepperComponent step={step} />
      </div>
      {step == 1 && (
        <div>
          <Typography order={1}>{schema.title}</Typography>
          <Typography order={4}>{schema.description}</Typography>
          {formState[schema.key as string] &&
            formState[schema.key as string].formBuilderSchema.sections.map(
              (
                section: FormElement | Section | RepeatableSection,
                sectionIndex: number
              ): React.ReactNode => {
                return (
                  <React.Fragment key={section.key as React.Key}>
                    <Renderer
                      renderElement={section}
                      basePath={"" as string}
                      formKey={schema.key as string}
                      formBuilderSchema={formState[schema.key as string]}
                      keyIndex={[sectionIndex]}
                      initialSchema={schema}
                    />
                  </React.Fragment>
                );
              }
            )}
        </div>
      )}

      <div>{step === 2 && <Viewer formKey={schema.key as string} />}</div>

      <div>
        {step == 3 &&
          (children ? (
            <div>{children}</div>
          ) : (
            <div>
              <IconCheck
                stroke={1.5}
                size={200}
                className="m-auto"
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
              <Typography className="text-center">
                {successText || "Success"}
              </Typography>
              <Typography order={5} className="text-center">
                {successDescription ||
                  "You can fill another JAF or edit and preview in the dashboard !"}
              </Typography>
            </div>
          ))}
      </div>

      {step < 3 && (
        <div className="flex justify-between">
          <div>
            {step > 1 && (
              <Button
                className="mt-4"
                ripple={true}
                aria-hidden={true}
                onClick={() => setStep(step - 1)}
                variant="outlined"
              >
                BACK
              </Button>
            )}
          </div>
          <Button
            className="mt-4"
            ripple={true}
            aria-hidden={true}
            onClick={handleSubmit}
            variant="gradient"
          >
            {step < 2 ? "NEXT" : "SUBMIT"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Form;
