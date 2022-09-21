import React, { useEffect, useState } from 'react'

interface UserProps {
    username: string
}

function UserTodo({ username }: UserProps) {
    const [ todo, setTodo ] = useState<Array<JSX.Element>>();

    const setUsersTodo = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!res) {
            return;
        }
        const users = await res.json();
        const findUser = users.find((item: any) => {
            return item.username.toLowerCase() === username;
        });
        if(!findUser) {
            return;
        }

        const todoRes = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await todoRes.json();
        const userTodo = todos.filter((todo: any) => {
            return todo.userId === findUser.id;
        });
        const list = userTodo.map((item: any) => {
            return (
                <li key={item.id}>
                    {item.title}
                </li>
            )
        });
        setTodo(list);
    }

    useEffect(() => {
        if(username) {
            setUsersTodo();
        }
    }, [username])

    return (
            <ul style={{marginTop: '1rem', listStyleType: 'none'}}>
                { todo }
            </ul>
    )
}

export default UserTodo;