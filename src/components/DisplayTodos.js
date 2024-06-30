import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => ({
  todos: state,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (obj) => dispatch(addTodos(obj)),
  removeTodo: (id) => dispatch(removeTodos(id)),
  updateTodo: (obj) => dispatch(updateTodos(obj)),
  completeTodo: (id) => dispatch(completeTodos(id)),
});

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");

  const filteredTodos = useMemo(() => {
    switch (sort) {
      case "active":
        return props.todos.filter((todo) => !todo.completed);
      case "completed":
        return props.todos.filter((todo) => todo.completed);
      case "all":
      default:
        return props.todos;
    }
  }, [props.todos, sort]);

  return (
    <div className="displaytodos">
      <div className="buttons">
        {["active", "completed", "all"].map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.button>
        ))}
      </div>
      <ul>
        <AnimatePresence>
          {filteredTodos.length > 0 &&
            filteredTodos.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                removeTodo={props.removeTodo}
                updateTodo={props.updateTodo}
                completeTodo={props.completeTodo}
              />
            ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
