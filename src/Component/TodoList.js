/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './style.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEffect } from 'react';
function App() {

  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem("data")) || []);
  const [carant, setCarant] = useState({ text: "", check: "false" });
  const [checke, setChecke] = useState(0);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("ShowAll");
  const [editIndex, setEditIndex] = useState();

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedTodoData = [...todoData];
      updatedTodoData[index].check = checked ? "true" : "false";
      localStorage.setItem("data", JSON.stringify(updatedTodoData));
      setTodoData(JSON.parse(localStorage.getItem("data")));
      chacked();
    } else {
      setCarant((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  function clickHendal(e) {
    if (carant.text !== "") {
      const updatedTodoData = [...todoData, carant];
      localStorage.setItem("data", JSON.stringify(updatedTodoData));
      setTodoData(JSON.parse(localStorage.getItem("data")));
      carant.text = '';
    } else {
      alert("Enter Valid☹️.");
    }
  }
  function deletehandal(index) {
    const updatedTodoData = [...todoData];
    if (updatedTodoData[index].check === "true") {
      if (window.confirm("Are you sure you want to delete this item?")) {

        updatedTodoData.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(updatedTodoData));
        setTodoData(updatedTodoData);
        carant.text = '';
      }
    } else {
      window.alert("It can be deleted after completing your work.")
    }
  }

  function edithandal(index) {
    setActive(true)
    setEditIndex(index)
    setCarant(todoData[index]);
  }
  function Edit() {
    todoData[editIndex] = carant
    localStorage.setItem("data", JSON.stringify(todoData));
    setTodoData(JSON.parse(localStorage.getItem("data")));
    setActive(false)
    carant.text = '';
  }

  function ShowAll() {
    setStatus("ShowAll");
  }
  function ShowActive() {
    setStatus("ShowActive");
  }
  function ShowCompleted() {
    setStatus("ShowCompleted")
  }

  function chacked() {
    const completed = todoData.filter((data) => data.check === "true").length;
    setChecke(completed);
  }
  useEffect(() => {
    chacked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoData]);



  // Render the todo list
  return (
    <div className="container">
      <div className="todo-app">
        <h2>  Todo List  </h2>
        <div className="row">
          <input
            value={carant.text}
            type="text"
            className="add-task"
            id="add"
            placeholder="Add your ToDo"
            autoFocus
            name='text'
            onChange={handleChange}
          />
          {active ? <button id="btn" onClick={Edit}>
            UPDATE
          </button> : <button id="btn" onClick={clickHendal}>
            ADD
          </button>}

        </div>

        <ul>
          <li className='hade'>Your ToDo</li>
          {todoData.map((data, index) => (
            status === "ShowAll" ?
              <li key={index}>
                <div>
                  <input
                    type="checkbox" width={10}
                    name='check'
                    checked={data.check === "true"}
                    onChange={(e) => handleChange(e, index)}

                  />
                </div>
                <p className={data.check === "true" ? 'line' : 'dis'}>{data.text}</p>
                <div>
                  <EditIcon className='edit' onClick={() => edithandal(index)} />
                </div>
                <div>
                  <DeleteForeverIcon className='delete' onClick={() => deletehandal(index)} />
                </div>
              </li> : status === "ShowActive" && data.check === "false" ? <li >
                <div>
                  <input
                    type="checkbox" width={10}
                    name='check'
                    checked={data.check === "true"}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <p className={data.check === "true" ? 'line' : 'dis'}>{data.text}</p>
                <div>
                  <EditIcon className='edit' onClick={() => edithandal(index)} />
                </div>
                <div>
                  <DeleteForeverIcon className='delete' onClick={() => deletehandal(index)} />
                </div>
              </li> : status === "ShowCompleted" && data.check === "true" ? <li >
                <div>
                  <input
                    type="checkbox" width={10}
                    name='check'
                    checked={data.check === "true"}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <p className={data.check === "true" ? 'line' : 'dis'}>{data.text}</p>
                <div>
                  <EditIcon className='edit' onClick={() => edithandal(index)} />
                </div>
                <div>
                  <DeleteForeverIcon className='delete' onClick={() => deletehandal(index)} />
                </div>
              </li> : null
          ))
          }
        </ul>

        <div className='info'>
          <div className="completed-task">
            <p>
              Completed:{checke}
            </p>
          </div>
          <div className="remaining-task">
            <p>

              Total Tasks:{todoData.length}

            </p>
          </div>
        </div>
        <div className='status'>
          <ButtonGroup size="large" aria-label="large button group">
            <Button key="ALL" color='inherit' onClick={ShowAll}>ALL</Button>
            <Button key="ACTIVE" color='inherit' onClick={ShowActive}>ACTIVE</Button>
            <Button key="COMPLETED" color='inherit' onClick={ShowCompleted}>COMPLETED</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default App;
