import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import "./education.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import BreadCrumb from '../Modal/BreadCrumb'
import { TokenContext } from "../../../src/Context/TokenProvider";


const Education = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const { token } = useContext(TokenContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/education/viewAll",
        {
          headers: {
            Authorization: `${token}`,
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
      alert("Please Enter Education First");
    } else if (inputValue && edit) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/education/update/${editId}`,
          {
            name: inputValue,
          },
          {
            headers: {
              Authorization:  `Bearer ${token}`,
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
          "http://localhost:8000/api/education/add",
          {
            name: inputValue,
          },
          {
            headers: {
              Authorization:  `${token}`,
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
      await axios.delete(`http://localhost:8000/api/education/delete/${id}`, {
        headers: {
          Authorization:  `${token}`,
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
    <div className="education_main_container p-8">
      <div className="mt-16">
        <BreadCrumb />
        <div className="flex items-center justify-between mt-5">
          <div>
            <input
              className="w-[20rem] p-2 mr-5 text-black search_input"
              type="text"
              placeholder="Enter Education Here For Add"
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
                placeholder="Search Education"
              />
              <IoSearch className="absolute text-xl top-[1rem] right-[0.7rem]" />
            </div>
          </div>
        </div>

        <table className="data_tbl">
          <thead>
            <tr>
              <th>No.</th>
              <th>Education Name</th>
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
};

export default Education;
