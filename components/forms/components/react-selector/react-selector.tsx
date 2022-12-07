import React, { useId } from "react";
import { FieldProps } from "formik";
import Select from "react-select";
import { Options, OnChangeValue, StylesConfig } from "react-select";

const selectStyle: StylesConfig<Option | Option[] | string, boolean> = {
  control: (styles, { isDisabled }) => {
    return {
      ...styles,
      "&:hover": { borderColor: "#000" },
      color: isDisabled ? "#2734438c" : "#273443",
      background: isDisabled ? "#27344317" : "#fff",
      borderColor: "#000",
      minHeight: "45px",
      height: "auto",
      boxShadow: "none",
    };
  },
  // option: (styles, { isDisabled }) => {
  //   return {
  //     ...styles,
  //     background: isDisabled ? "red" : "#fff",
  //     color: isDisabled ? "red" : "#273443",
  //   };
  // },
  placeholder: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: isDisabled ? "red" : "#273443",
      fontSize: "14px",
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      borderRadius: 0,
      maxHeight: "200px",
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
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
  onItemSelected?: (item: string) => void;
  placeholder?: string;
  borderRadius?: number;
  disabled?: boolean;
}

export const ReactSelector = ({
  className,
  placeholder,
  borderRadius = 25,
  field,
  form,
  options,
  isMulti = false,
  isSearchable = true,
  disabled = false,
  filterOption,
  onInputChange,
  onItemSelected,
}: CustomSelectProps) => {
  const onChange = (option: OnChangeValue<Option | Option[] | string, boolean>) => {
    form.setFieldValue(field.name, isMulti ? (option as Option[]).map((item: Option) => item.value) : (option as Option).value);
    if (onItemSelected) {
      if (option === null) {
        onItemSelected("other");
      } else {
        onItemSelected((option as Option).value);
      }
    }
  };

  const getValue = () => {
    if (field.value) {
      if (options) {
        return isMulti
          ? options.filter((option) => field.value.indexOf(option.value) >= 0)
          : options.find((option) => option.value === field.value);
      } else {
        return isMulti ? [] : null;
      }
    } else {
      return null;
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
      isDisabled={disabled}
    />
  );
};
