import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios'

export default function TodoList() {

    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/gettask')
            .then((res) => {
                console.log(res.data)
                setTodo(res.data.data)
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <>
            <div>
                <DragDropContext>
                    <Droppable droppableId='List'>
                        {(provided) => (
                            <ul className='List' {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    todo.map(({ Title, _id }, index) => {
                                        return (
                                            <Draggable key={_id} draggableId={_id} index={index}>
                                                {(provided) => (
                                                    <li {...provided.droppableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <p>{Title}</p>
                                                    </li>
                                                )}
                                            </Draggable>
                                        )
                                    })
                                }
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    )
}
