export const addTask = (data) => {
    return {
        type: 'ADD_TASK',
        data: data
    }
}
export const editTask = (data) => {
    return {
        type: 'EDIT_TASK',
        data: data,
    }
}
export const deleteTask = (id) => {
    return {
        type: 'DELETE_TASK',
        id: id
    }
}