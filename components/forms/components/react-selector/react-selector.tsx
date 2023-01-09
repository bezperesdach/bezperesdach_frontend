import React, { useId } from "react";
import { FieldProps } from "formik";
import Select, { Options, OnChangeValue, StylesConfig } from "react-select";

const selectStyle: StylesConfig<ReactSelectOption | ReactSelectOption[] | string, boolean> = {
  control: (styles, { isDisabled }) => {
    return {
      ...styles,
      "&:hover": { borderColor: "#000" },
      color: isDisabled ? "#DADDDF" : "#273443",
      background: isDisabled ? "#ECEDEE" : "#fff",
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
      color: isDisabled ? "#2734438c" : "#B3B3B3",
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

interface CustomSelectProps extends FieldProps {
  options: Options<ReactSelectOption>;
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
  const onChange = (option: OnChangeValue<ReactSelectOption | ReactSelectOption[] | string, boolean>) => {
    form.setFieldValue(
      field.name,
      isMulti ? (option as ReactSelectOption[]).map((item: ReactSelectOption) => item.value) : (option as ReactSelectOption).value
    );
    if (onItemSelected) {
      if (option === null) {
        onItemSelected("other");
      } else {
        onItemSelected((option as ReactSelectOption).value);
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
