import React from "react";
import EditForm from "./editForm";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useToggle from "../custom-react-hooks/useToggle";

function FormItem({ renderText, remove, edit, toggleIsActive }) {
  const [isEditing, toggle] = useToggle(false);
  const handleRemove = () => {
    toggleIsActive();
    remove();
  };

  return (
    <ListItem style={{ height: "6.4rem" }}>
      {isEditing ? (
        <EditForm
          renderText={renderText}
          handleEdit={edit}
          toggleEdit={toggle}
        />
      ) : (
        <>
          <ListItemText>{renderText}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="Edit Button" onClick={toggle}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete Button" onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default FormItem;
