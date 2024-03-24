import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";

const DeleteButton = styled.button({
  width: 16,
  height: 16,
  position: "absolute",
  right: 0,
  top: 0,
  cursor: "pointer",
  background: "transparent",
  fontSize: 14,
  border: "none",
  "aria-label": "Delete item",
  visibility: "hidden",
});

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
  position: "relative",
  ":hover button": {
    visibility: "visible",
  },
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
  "aria-label": "Checkbox",
});

export interface TodoItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (id: string, checked: boolean) => void;
  onDelete?: (id: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  label,
  checked = false,
  onChange,
  onDelete,
}) => {
  const handleOnChange = useCallback(
    (e) => {
      onChange && onChange(id, e.target.checked);
    },
    [id, onChange]
  );
  const handleOnDelete = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete && onDelete(id);
    }
  }, [id, onDelete]);

  return (
    <Wrapper>
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleOnChange}
      />
      <Label checked={checked}>{label}</Label>
      <DeleteButton type="button" onClick={handleOnDelete}>
        x
      </DeleteButton>
    </Wrapper>
  );
};
