import React, { useId } from "react";
import { FieldProps } from "formik";
import Select from "react-select";
import { Options, OnChangeValue, StylesConfig } from "react-select";

const selectStyle: StylesConfig<Option | Option[] | string, boolean> = {
  control: (provided, state) => {
    // none of react-select's styles are passed to <Control />
    return {
      ...provided,
      borderColor: "#000",
    };
  },
  menu: (provided, state) => {
    // const { selectProps } = state;

    return {
      ...provided,
      borderRadius: 0,
    };
  },
};

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Options<Option>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  borderRadius?: number;
}

export const ProjectTypeSelect = ({
  className,
  placeholder,
  borderRadius = 25,
  field,
  form,
  options,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: OnChangeValue<Option | Option[] | string, boolean>) => {
    form.setFieldValue(field.name, isMulti ? (option as Option[]).map((item: Option) => item.value) : (option as Option).value);
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      theme={(theme) => ({
        ...theme,
        borderRadius,
        fontFamily: "Roboto",
      })}
      components={{
        IndicatorSeparator: () => null,
      }}
      instanceId={useId()}
      styles={selectStyle}
      noOptionsMessage={({ inputValue }) => (!inputValue ? "" : "Тип не найден")}
    />
  );
};
