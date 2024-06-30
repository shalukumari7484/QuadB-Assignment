import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const inputRef = useRef(true);
  const [isEditing, setIsEditing] = useState(false);
  const [warning, setWarning] = useState("");

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
    setIsEditing(true);
    setWarning("");
  };

  const update = (id, value) => {
    if (value.trim() === "") {
      setWarning("Todo text cannot be empty!");
      return;
    }
    updateTodo({ id, item: value });
    inputRef.current.disabled = true;
    setIsEditing(false);
    setWarning("");
  };

  const handleKeyPress = (id, value, e) => {
    if (e.which === 13) {
      update(id, value);
    }
  };

  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className={`card ${warning ? "warning-active" : ""}`}
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => handleKeyPress(item.id, inputRef.current.value, e)}
        style={{ resize: "none" }}
      />
      <div className="btns">
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => changeFocus()}
          >
            <AiFillEdit />
          </motion.button>
        )}
        {isEditing && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => update(item.id, inputRef.current.value)}
          >
            Save
          </motion.button>
        )}
        {!isEditing && item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
        >
          <IoClose />
        </motion.button>
      </div>
      {warning && <span className="warning">{warning}</span>}
    </motion.li>
  );
};

export default TodoItem;
