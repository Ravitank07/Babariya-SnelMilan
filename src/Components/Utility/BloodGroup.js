import React, { useEffect, useState } from "react";
import axios from "axios";
import "./bloodgroup.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import BreadCrumb from '../Modal/BreadCrumb'

const BloodGroup = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const Authorization = process.env.REACT_APP_AUTHORIZATION_TOKEN;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/bloodgroup/viewAll",
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      alert("Please Enter BloodGroup First");
    } else if (inputValue && edit) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/bloodgroup/update/${editId}`,
          {
            name: inputValue,
          },
          {
            headers: {
              Authorization: `${Authorization}`,
            },
          }
        );
        const updatedData = data.map((item) =>
          item._id === editId ? response.data.data : item
        );
        setData(updatedData);
      } catch (error) {
        console.error("Error:", error);
      }
      setInputValue("");
      // setEditId(null)
      setEdit(false);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/bloodgroup/add",
          {
            name: inputValue,
          },
          {
            headers: {
              Authorization: `${Authorization}`,
            },
          }
        );
        setData([...data, response.data.data]);
        setInputValue("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleUpdate = (id) => {
    const editName = data.find((i) => {
      return i._id === id;
    });
    setInputValue(editName.name);
    setEditId(id);
    setEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/bloodgroup/delete/${id}`, {
        headers: {
          Authorization: `${Authorization}`,
        },
      });
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="bloodgroup_main_container p-8">
      <div className="mt-16">
      <BreadCrumb/>
        <div className="flex items-center justify-between mt-5">
          <div>
            <input
              className="w-[20rem] p-2 mr-5 text-black search_input"
              type="text"
              placeholder="Enter BloodGroup Here For Add"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSubmit} className="search_btn">
              Add
            </button>
          </div>

          <div>
            <div className="w-fit relative">
              <input
                className="w-[20rem] p-2 text-black search_input"
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search BloodGroup"
              />
              <IoSearch className="absolute text-xl top-[1rem] right-[0.7rem]" />
            </div>
          </div>
        </div>

        <table className="data_tbl">
          <thead>
            <tr>
              <th>No.</th>
              <th>BloodGroup Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((i, index) => (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>
                  <button onClick={() => handleUpdate(i._id)}>
                    <CiEdit className="end_btn" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(i._id)}>
                    <MdDelete className="end_btn" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodGroup
