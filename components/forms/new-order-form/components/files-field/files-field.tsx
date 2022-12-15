import { useState, useRef, useMemo } from "react";
import { ErrorMessage, FieldProps } from "formik";
// import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { convertBytesToAppropriateUnit, roundTo, showAndHideError } from "../../../../../utils/utils";

import styles from "./files-field.module.css";

interface Props extends FieldProps<File[]> {
  placeholder: string;
  disabled: boolean;
  accept: string;
  type: string;
  totalSize: number;
  setTotalSize: (num: number) => void;
}

// const temporaryErrorVariants = {
//   shown: { height: "100%", opacity: 1 },
//   hidden: { height: "0", opacity: 0 },
// };

export const FilesField = ({ totalSize, setTotalSize, field, form, disabled, accept, type }: Props) => {
  const [temporaryError, setTemporaryError] = useState("");
  const addFilesRef = useRef<HTMLInputElement>(null);

  const onInputAddFiles = () => {
    if (field.value) {
      if (field.value.length > 7 || totalSize / (1024 * 1024) > 20) {
        return;
      }
    }

    if (addFilesRef.current) {
      addFilesRef.current.click();
    }
  };

  const sizeOrAmountIsTooLarge = useMemo(() => {
    if (field.value && field.value.length > 7) {
      return true;
    }
    if (totalSize / (1024 * 1024) > 20) {
      return true;
    }
    return false;
  }, [totalSize, field.value]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const fileList = e.target.files;
    const fileArray = field.value === null ? [] : field.value;
    if (field.value === null) {
      const size = fileList.length < 8 ? fileList.length : 8;
      let totalSize = 0;
      for (let i = 0; i < size; i++) {
        const file = fileList[i];
        if (file.size !== 0) {
          totalSize += file.size;
          fileArray.push(file);
        }
      }
      setTotalSize(totalSize);
    } else {
      for (let i = 0; i < fileArray.length; i++) {
        if (fileArray[i].name === fileList[0].name && fileArray[i].size === fileList[0].size) {
          e.target.value = "";
          showAndHideError(
            () => setTemporaryError("Этот файл уже добавлен"),
            () => setTemporaryError(""),
            2000
          );
          return;
        }
      }

      fileArray.push(fileList[0]);
      setTotalSize(totalSize + fileList[0].size);
    }

    form.setFieldValue(field.name, fileArray);
    e.target.value = "";
  };

  const removeFile = (file: File) => {
    const filtered = field.value.filter((value) => value !== file);
    if (filtered.length === 0) {
      setTotalSize(0);
      form.setFieldValue(field.name, null);
      return;
    }
    setTotalSize(totalSize - file.size);
    form.setFieldValue(
      field.name,
      field.value.filter((value) => value !== file)
    );
  };

  return (
    <div className={styles.form_item}>
      <label className={styles.label}>Дополнительные файлы</label>

      <div className={`${styles.input_container} ${disabled && styles.disabled_input_container}`}>
        <input
          className={styles.input}
          type={type}
          name="media"
          id="media"
          accept={accept}
          ref={addFilesRef}
          multiple={field.value ? false : true}
          onChange={onFileChange}
          disabled={disabled}
        />

        <div className={styles.files_container} style={disabled ? { pointerEvents: "none" } : {}}>
          {field.value &&
            field.value.length > 0 &&
            field.value.map((file, index) => {
              return (
                <div key={file.name + file.size}>
                  <div className={styles.file}>
                    <span className={styles.file_name}> {file.name} </span>
                    <button type="button" className={styles.file_size_and_remove} onClick={() => removeFile(file)}>
                      <p className={disabled ? "" : styles.blue_text}>{convertBytesToAppropriateUnit(file.size)}</p>
                      <div className={styles.remove}>X</div>
                    </button>
                  </div>
                  {field.value.length - 1 !== index && <hr className={styles.separator_line} />}
                </div>
              );
            })}

          {field.value && <p className={styles.temporary_error}>{temporaryError}</p>}

          <button
            className={styles.add_files}
            type="button"
            onClick={onInputAddFiles}
            style={sizeOrAmountIsTooLarge ? { cursor: "normal" } : { cursor: "pointer" }}
          >
            {!sizeOrAmountIsTooLarge && (
              <p className={disabled ? "" : styles.blue_text}>{field.value === null ? "Добавить файлы" : "Добавить файл"}</p>
            )}
            {field.value === null ? (
              <p className={styles.placeholder}>Максимум 8 файлов общим размером до 20 МБ</p>
            ) : (
              <p className={styles.placeholder}>
                Добавлено <span className={disabled ? "" : styles.blue_text}>{field.value.length}/8</span>, размер:{" "}
                <span style={!disabled ? (totalSize / (1024 * 1024) > 20 ? { color: "#FE3D26" } : { color: "#1070EE" }) : {}}>
                  {roundTo(totalSize / (1024 * 1024), 2)}/20 МБ
                </span>
              </p>
            )}
          </button>
        </div>
      </div>
      <ErrorMessage className={styles.error_label} name={field.name} component="div" />
    </div>
  );
};
