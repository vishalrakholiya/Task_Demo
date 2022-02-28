
const initialState = [
    {
        id: 1,
        desc: "test"
    }
]

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                action.data
            ]
            
        case "EDIT_TASK":
            let data = [...state]
            const findIndexEdit = data.findIndex((item) => item.id == action?.data?.id);
            data[findIndexEdit] = action?.data
            return data;

        case "DELETE_TASK":
            let allData = [...state];
            allData = allData.filter((item) => item.id !== action.id)
            return allData;

        default:
            return state
    }
}