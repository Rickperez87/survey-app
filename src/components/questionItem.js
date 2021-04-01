import React from "react";
import EditQuestionForm from "./editQuestionForm";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useToggle from "../custom-react-hooks/useToggle";

function QuestionItem({ id, question, removeQuestion, editQuestion }) {
  const [isEditing, toggle] = useToggle(false);
  return (
    <ListItem style={{ height: "6.4rem" }}>
      {isEditing ? (
        <EditQuestionForm
          id={id}
          question={question}
          editQuestion={editQuestion}
          toggleEdit={toggle}
        />
      ) : (
        <>
          <ListItemText>{question}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="Edit Button" onClick={toggle}>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete Button"
              onClick={() => removeQuestion(id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default QuestionItem;
