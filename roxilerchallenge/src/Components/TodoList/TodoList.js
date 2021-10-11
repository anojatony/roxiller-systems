import React, { useState, useEffect } from "react";
import "../TodoList/TodoList.css";
import axios from "axios";
import UserDetails from "../UserDetails/UserDetails";

function TodoList() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sorting = () => {
    if (sort === "asc") {
      const sorted = [...todo].sort((a, b) => {
        return b.id - a.id;
      });
      setTodo(sorted);
      setSort("des");
    }

    if (sort === "des") {
      const sorted = [...todo].sort((a, b) => {
        return a.id - b.id;
      });
      setTodo(sorted);
      setSort("asc");
    }
  };

  return (
    <div>
      <div className="container">
      <div className="initial"><h4>React Coding Challenge - ToDos</h4></div> 
        <div className="row component">
          <div className="col-md-8 todo-details">
            <input 
              className="form-control"
              placeholder="Search"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" onClick={sorting} id="one">
                    ToDo ID
                  </th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {todo.filter((obj) => {
                    if (filter === "") {
                      return obj;
                    } else if (
                      obj.title.toLowerCase().includes(filter.toLowerCase()) ||
                      filter === obj.id.toString() ||
                      (filter.toLowerCase() === "complete" && obj.completed === true) ||
                      (filter.toLowerCase() === "incomplete" && obj.completed === false)
                      ) {
                      return obj;
                    }
                    return false;
                  })
                  .map((obj) => {
                    return (
                      <tr key={obj.id}>
                        <th scope="row">{obj.id}</th>
                        <td>{obj.title}</td>
                        <td>
                          {obj.completed === true ? "Complete" : "Incomplete"}
                        </td>
                        <td>
                          <button className="btn" onClick={() => setValue(obj)}>View User</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* TodoList ends */}

          <div className="col-md-4">
            {value ? <UserDetails {...value}></UserDetails> : ""}
          </div>
        </div>
        {/* row ends */}
      </div>
      {/* container ends */}
    </div>
  );
}

export default TodoList;
