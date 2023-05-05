import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction, deleteUserAction,updateUserAction } from "../store/slice/userSlice";
import axios from "axios"

const UserComp = () => {
  const [user, setUser] = useState({ id: "", fname: "", lname: "" });
  const [isedit, setIsEdit] = useState(false);

  const myUsers = useSelector((state) => state.users);
  console.log(myUsers);

  const dispatch = useDispatch();
  // console.log(dispatch)
 

  const handleChange = (e) => {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };
  const clearForm = () => {
    setUser({ id: "", fname: "", lname: "" });
  };

  const editUser = (user) => {
    setIsEdit(true);
    setUser(user);
  };

  const handleUpdate = () => {
    dispatch(updateUserAction(user))
    clearForm()
    setIsEdit(false)
  };

  const addUser = () => {
    dispatch(addUserAction(user));
    clearForm();
  };
  const deleteUser = (user) => {
    dispatch(deleteUserAction(user));
  };
  return (
    <div>
      <form>
        <label>Id : </label>
        <input
          type="text"
          name="id"
          value={user.id}
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={isedit}
        />
        <br />
        <label>Fname : </label>
        <input
          type="text"
          name="fname"
          value={user.fname}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        <label>Lname : </label>
        <input
          type="text"
          name="lname"
          value={user.lname}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        <br />
        {isedit ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          updateUser
        </button>
      ) : (
        <button type="button" className="btn btn-primary" onClick={addUser}>
          addUser
        </button>
      )}
      </form>
      <br />
      <br />

      <table className="table ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Fname</th>
            <th>Lname</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {myUsers.users.map((usr, i) => (
            <tr key={i}>
              <td>{usr.id}</td>
              <td>{usr.fname}</td>
              <td>{usr.lname}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    editUser(usr);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteUser(usr);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default UserComp;
