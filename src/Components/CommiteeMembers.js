import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal/Modal";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import "./commiteemembers.css";
import BreadCrumb from './Modal/BreadCrumb'


const CommiteeMembers = () => {
  const [commiteeMemberData, setCommiteeMemberData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null); // New state to hold the ID of the member being edited
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    commitee: "",
    memberName: "",
    village: "",
    mobile: "",
  });

  const [commiteeData, setCommiteeData] = useState([]);
  const [villageData, setVillageData] = useState([]);
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      commitee: "",
      memberName: "",
      village: "",
      mobile: "",
    });
    setEdit(false); // Reset edit mode
    setEditId(null); // Reset edit ID
  };

  const Authorization =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGYwZTcxNmJlMGEyYWY0NmZkNjg5NyIsImlhdCI6MTcxNjc5MzAwMCwiZXhwIjoxNzE3MDUyMjAwfQ.WANtKZKls-9zoplsdQu3wkcuJ2Gj9QuOe3-2ZHvb368";

  useEffect(() => {
    fetchCommiteeData();
    fetchVillageData();
    fetchGetCommiteeMemberData();
  }, []);

  const fetchCommiteeData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/commitee/viewAll",
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      setCommiteeData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVillageData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/village/viewAll",
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      setVillageData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGetCommiteeMemberData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/commiteeMember/list",
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      setCommiteeMemberData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.commitee) {
      newErrors.commitee = "Please select a Committee";
    }
    if (!formData.memberName.trim()) {
      newErrors.memberName = "Name is required";
    }
    if (!formData.village) {
      newErrors.village = "Please select a Village";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (
      !/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
        formData.mobile.trim()
      )
    ) {
      newErrors.mobile = "Invalid mobile number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/commiteeMember/add",
          formData,
          {
            headers: {
              Authorization: Authorization,
            },
          }
        );
        setCommiteeMemberData([...commiteeMemberData, response.data.data]);
        setFormData({
          commitee: "",
          memberName: "",
          village: "",
          mobile: "",
        });
        closeModal();
      } catch (error) {
        console.error("Error adding committee member:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/commiteeMember/update/${editId}`,
          formData,
          {
            headers: {
              Authorization: Authorization,
            },
          }
        );

        const updatedData = commiteeMemberData.map((item) =>
          item._id === editId ? response.data.data : item
        );
        setCommiteeMemberData(updatedData);
        closeModal();
      } catch (error) {
        console.error("Error updating committee member:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = commiteeMemberData.filter((item) =>
    item.memberName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id) => {
    const selectedMember = commiteeMemberData.find((item) => item._id === id);

    setFormData({
      commitee: selectedMember.commitee,
      memberName: selectedMember.memberName,
      village: selectedMember.village,
      mobile: selectedMember.mobile,
    });

    setIsModalOpen(true);
    setEdit(true);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/CommiteeMember/delete/${id}`,
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      const updatedData = commiteeMemberData.filter((item) => item._id !== id);
      setCommiteeMemberData(updatedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen overflow-auto py-5">
      <div className="mt-14">
        <div className="flex justify-end p-4 cm_header">
    <div className="h-screen overflow-auto p-8">
      <div className="pt-16">
      <BreadCrumb/>

        <div>
          <button
            className="text-white px-4 py-2 rounded modal_opn_btn"
            onClick={openModal}
          >
            Add Committee Member
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {edit ? "Edit Committee Member" : "Add Committee Member"}
              </h2>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <form onSubmit={edit ? handleUpdate : handleSubmit}>
              {edit ? (
                ""
              ) : (
                <div className="w-[30rem] grid grid-cols-2 items-center mb-3">
                  <label>Select Committee:</label>
                  <select
                    name="commitee"
                    value={formData.commitee}
                    onChange={handleChange}
                    className="search_input"
                  >
                    <option value="">--Select--</option>
                    {commiteeData.map((option) => (
                      <option key={option._id} value={option.commitee}>
                        {option.commitee}
                      </option>
                    ))}
                  </select>
                  {errors.commitee && (
                    <span className="text-red-500">{errors.commitee}</span>
                  )}
                </div>
              )}
              <div className="w-[30rem] grid grid-cols-2 items-center mb-3">
                <label>Name:</label>
                <input
                  type="text"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleChange}
                  className="search_input"
                />
                {errors.memberName && (
                  <span className="text-red-500">{errors.memberName}</span>
                )}
              </div>
              <div className="w-[30rem] grid grid-cols-2 items-center mb-3">
                <label>Select Village:</label>
                <select
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="search_input"
                >
                  <option value="">--Select--</option>
                  {villageData.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {errors.village && (
                  <span className="text-red-500">{errors.village}</span>
                )}
              </div>
              <div className="w-[30rem] grid grid-cols-2 items-center mb-3">
                <label>Mobile Number:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="search_input"
                />
                {errors.mobile && (
                  <span className="text-red-500">{errors.mobile}</span>
                )}
              </div>
              <div className="w-fit m-auto">
                {edit ? (
                  <button type="submit" className="btn">
                    Edit
                  </button>
                ) : (
                  <button type="submit" className="btn">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </Modal>

        <div>
          <div className="w-fit relative">
            <input
              className="w-[20rem] p-2 text-black search_input"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Member"
            />
            <IoSearch className="absolute text-xl top-[1.1rem] right-[1.2rem]" />
          </div>
        </div>

        <table className="data_tbl">
          <thead>
            <tr>
              <th>No.</th>
              <th>Committee</th>
              <th>Committee Members Name</th>
              <th>Village</th>
              <th>Mobile</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((i, index) => (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i.commitee}</td>
                <td>{i.memberName}</td>
                <td>{i.village}</td>
                <td>{i.mobile}</td>
                <td>
                  <button onClick={() => handleEdit(i._id)}>
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

export default CommiteeMembers;
