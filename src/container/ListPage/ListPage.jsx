import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Popconfirm, notification } from "antd";

import TextInput from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import CommonModal from "../../component/CommonModal/CommonModal";
import TextArea from "../../component/TextArea/TextArea";
import { addTask, editTask, deleteTask } from "../../Redux/Action/Action";
import './ListPage.css'


const ListPage = (props) => {
    const selectorData = useSelector((state) => state.taskListReducer)
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const LoggedIn = localStorage.getItem("isLogin");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const [addDataValue, setAddDataValue] = useState();
    const [typeAction, setTypeAction] = useState()
    const [demoData, setDemoData] = useState([...selectorData])

    useEffect(() => {
        if (LoggedIn == 'false' || LoggedIn == null) {
            navigate("/login");
        }
    }, [LoggedIn]);

    const showModal = (type, data) => {
        setTypeAction(type)
        if (data) {
            setEditData(data)
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (typeAction == "add") {
            if (addDataValue && addDataValue.length) {
                setDemoData([
                    ...demoData,
                    {
                        id: new Date().getTime(),
                        desc: addDataValue
                    }
                ])
                dispatch(addTask({
                    id: new Date().getTime(),
                    desc: addDataValue
                }))
                setAddDataValue("")
                setEditData({})
                setIsModalVisible(false);
            } else {
                notification.open({
                    message: 'Please fill description.',
                });
            }
        } else if (typeAction == "edit") {
            const findIndexEdit = demoData.findIndex((item) => item.id == editData.id);
            const listData = [...demoData];
            listData[findIndexEdit] = editData
            setDemoData(listData)
            editTask(dispatch(editTask(editData)))
            setEditData({})
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditData({})
    };

    const handleInputChange = (e) => {
        setAddDataValue(e.target.value)
        setEditData({
            ...editData,
            desc: e.target.value
        })
    }

    const confirmDelete = (deleteId) => {
        const deletedArray = demoData.filter((data) => data.id !== deleteId)
        setDemoData(deletedArray)
        dispatch(deleteTask(deleteId))
    }

    const filterSearchHandler = (e) => {
        let searchValue = e.target.value;
        let filteredTasks = selectorData.filter((task) => {
            return task.desc.toLowerCase().includes(searchValue.toLowerCase());
        });
        setDemoData(filteredTasks);
    }

    return (
        <>
            <div className="mainListPage">
                <div className="listContainer">
                    <h3 className="headingList"> List Tasks </h3>
                    <div className="logoutBtn">
                        <Button onClick={() => {
                            localStorage.setItem("isLogin", false);
                            navigate("/login")
                        }} title="Log Out" />
                    </div>
                    <div className="searchBox">
                        <TextInput
                            placeholder="Search Task..."
                            type="text"
                            name="search"
                            handleChange={filterSearchHandler}
                        />
                    </div>
                    <div className="listScroll">
                        {
                            demoData && demoData.map((item, i) => (
                                <div key={i} className="listMainDesc">
                                    <ul className="list">
                                        <li> {item.desc} </li>
                                    </ul>
                                    <Popconfirm
                                        title="Are you sure to delete this task?"
                                        onConfirm={() => confirmDelete(item.id)}
                                        // onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined className="iconAction" />
                                    </Popconfirm>
                                    <EditOutlined onClick={() => showModal("edit", item)} className="iconAction" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="buttonAddDisc">
                    <Button onClick={() => showModal("add")} title="ADD" />
                </div>
            </div>
            <CommonModal title={typeAction == "edit" ? "Edit description" : "Add description"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <TextArea
                    placeholder={typeAction == "edit" ? "Edit Task" : "Add Task"}
                    name="desc"
                    value={editData.desc}
                    handleChange={handleInputChange}
                />
            </CommonModal>
        </>
    )
}

export default ListPage;