// useTodo.js
import { useEffect, useReducer } from "react";
import { todoReducer } from './todoReducer';

const initialState = [];

const init = () => {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    return localTodos || initialState;
};

export const useTodo = () => {
    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (newTodo) => {
        dispatchTodo({
            type: '[TODO] Add todo',
            payload: newTodo,
        });
    };

    const handleDeleteTodo = (id) => {
        dispatchTodo({
            type: '[TODO] Remove todo',
            payload: id,
        });
    };

    const handleToggleTodo = (id) => {
        dispatchTodo({
            type: '[TODO] Toggle todo',
            payload: id,
        });
    };

    const pendingTodosCount = todos.filter(todo => !todo.done).length;

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        pendingTodosCount,
    };
};

