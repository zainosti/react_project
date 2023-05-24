import React, { useState } from "react";

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.task.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    props.onEdit(props.task.id, editedTitle);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(props.task.title);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };
  return (
    <div className="task_divide">
      {isEditing ? (
        <input
          className="task_input"
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
        />
      ) : (
        <span className="task_title">{props.task.title}</span>
      )}{" "}
      <button
        className="delete_btn"
        onClick={() => props.onDelete(props.task.id)}
      >
        Delete
      </button>
      {props.showcomple && (
        <button
          className="complete_btn"
          onClick={() => props.onComplete(props.task.id)}
        >
          Mark Complete
        </button>
      )}
      {props.showincomple && (
        <button
          className="incomplete_btn"
          onClick={() => props.onIncomplete(props.task.id)}
        >
          Mark InComplete
        </button>
      )}
      {isEditing ? (
        <>
          <button className="save_btn" onClick={handleSaveClick}>
            Save
          </button>
          <button className="cancel_btn" onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      ) : (
        <button className="edit_btn" onClick={handleEditClick}>
          Edit
        </button>
      )}
    </div>
  );
};

export default Task;
