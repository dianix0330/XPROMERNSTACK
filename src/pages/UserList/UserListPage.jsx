import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import { getUsersByRole } from "../../_service";
import useAuth from "../../contexts/useAuth";
import UserInfo from "./UserInfo";
import "./index.css";

export default function UserListPage() {
  const [userName, setUserName] = useState("");
  const [userList, setUserList] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) navigate("/sign-in");
  
  const fetchData = async () => {
    if(user.role !== "user") {
      const result = await getUsersByRole(user.role, user.id);
      setUserList(result);
    }
    setUserName(user.firstname + " " + user.lastname);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <Header title={`${userName} (${user.role})`} />
      {
        user.role !== "user" ? (
          <div style={{ flex: 1, width: "100%" }}>
            <DataGrid rows={userList} columns={columns} />
          </div>
    
        ) : (
          <UserInfo data={user} />
        )
      }
    </div>
  );
}

const columns = [
  { field: "username", headerName: "User Name", width: 180, editable: true },
  { field: "firstname", headerName: "First Name", editable: true },
  {
    field: "lastname",
    headerName: "Last Name",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 220,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 220,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 220,
  },
  {
    field: "permission",
    headerName: "Allow",
    width: 100,
    renderCell: () => <Switch defaultChecked color="success" />,
  },
];
