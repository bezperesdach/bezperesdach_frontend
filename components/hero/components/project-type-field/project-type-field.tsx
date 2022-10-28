import React, { useId } from "react";
import { FieldProps } from "formik";
import Select from "react-select";
import { Options, OnChangeValue, StylesConfig } from "react-select";

const selectStyle: StylesConfig<Option | Option[] | string, boolean> = {
  control: (provided, _) => {
    return {
      ...provided,
      borderColor: "#000",
    };
  },
  placeholder: (provided, _) => {
    return {
      ...provided,
      color: "hsl(0, 0%, 70%)",
    };
  },
  menu: (provided, _) => {
    return {
      ...provided,
      borderRadius: 0,
      maxHeight: "200px",
    };
  },
  menuList: (provided, _) => {
    return {
      ...provided,
      borderRadius: 0,
      maxHeight: "200px",
    };
  },
};

export interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Options<Option>;
  isMulti?: boolean;
  isSearchable?: boolean;
  className?: string;
  filterOption?: () => boolean;
  onInputChange?: (e: string) => void;
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
  isSearchable = true,
  filterOption,
  onInputChange,
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
      isSearchable={isSearchable}
      noOptionsMessage={({ inputValue }) => (!inputValue ? "" : "Тип не найден")}
      filterOption={filterOption}
      onInputChange={onInputChange}
    />
  );
};
