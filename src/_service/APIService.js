import axios from "axios";

export const getUsersByRole = async (role, id) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify({role, id});
  try {
    const res = await axios.post("http://localhost:5000/users/", body, config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
