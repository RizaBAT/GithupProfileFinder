import { useEffect, useState } from "react";
import User from "./user";
import "./styles.css";

export default function GitupProfileFinder() {
  const [userName, setUserName] = useState("RizaBAT");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchGitupUserData() {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();

    if (data) {
      setUserData(data);
      setLoading(false);
      setUserName("");
    }
  }
  function handleSubmit() {
    fetchGitupUserData();
  }

  useEffect(() => {
    fetchGitupUserData();
  }, []);

  if (loading) {
    return <h1>Loading data! please wait.</h1>;
  }

  return (
    <div className="gitup-profile-container">
      <div className="input-wrapper">
        <input
          name="search-gitup-username"
          type="text"
          placeholder="Search Gitup Username..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      <button onClick={handleSubmit}>Search</button>
      </div>
      {userData !== null ? <User user={userData} /> : null}
    </div>
  );
}
