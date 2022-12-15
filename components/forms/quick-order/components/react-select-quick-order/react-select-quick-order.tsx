import React, { useId } from "react";
import Select from "react-select";
import { Options, OnChangeValue, StylesConfig } from "react-select";

const selectStyle: StylesConfig<ReactSelectOption | ReactSelectOption[] | string, boolean> = {
  control: (styles, { isDisabled }) => {
    return {
      ...styles,
      "&:hover": { cursor: "pointer" },
      color: isDisabled ? "#2734438c" : "#b3b3b3",
      background: isDisabled ? "#DADDDF" : "#fff",
      borderWidth: "3px",
      borderColor: isDisabled ? "#273445" : "#1070EE",
      borderRadius: "25px",
      minHeight: "45px",
      width: "100%",
      height: "auto",
      boxShadow: "none",
    };
  },
  valueContainer: (styles) => {
    return {
      ...styles,
      padding: "unset",
    };
  },
  option: (styles) => {
    return {
      ...styles,
      padding: "12px 22px",
    };
  },
  placeholder: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: isDisabled ? "#b3b3b3" : "#b3b3b3",
      fontSize: "16px",
      padding: "12px 18px",
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      borderRadius: "25px",
      height: "auto",
      maxHeight: "200px",
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      borderRadius: "25px",
      padding: 0,
      height: "auto",
    };
  },
  singleValue: (styles, { isDisabled }) => {
    return {
      ...styles,
      cursor: isDisabled ? "wait" : "pointer",
      color: isDisabled ? "#2734438c" : "#273444",
      padding: "12px 18px",
    };
  },
};

interface CustomSelectProps {
  options: Options<ReactSelectOption>;
  name: string;
  value: string;
  setValue: (name: string, value: string) => void;
  isSearchable?: boolean;
  className?: string;
  placeholder?: string;
  borderRadius?: number;
  disabled?: boolean;
}

export const ReactSelectQuickOrder = ({
  className,
  placeholder,
  borderRadius = 25,
  options,
  name,
  value,
  setValue,
  isSearchable = true,
  disabled = false,
}: CustomSelectProps) => {
  const onChange = (option: OnChangeValue<ReactSelectOption | ReactSelectOption[] | string, boolean>) => {
    setValue(name, (option as ReactSelectOption).value);
  };

  const getValue = () => {
    if (value) {
      if (options) {
        options.find((option) => option.value === value);
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <Select
      className={className}
      name={name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={false}
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
      noOptionsMessage={({ inputValue }) => (!inputValue ? "" : "Не найдено")}
      isDisabled={disabled}
    />
  );
};
