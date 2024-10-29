import { Link } from "react-router-dom";
import "./chat-list.css";
import { useQuery } from "@tanstack/react-query";

export const ChatList = () => {
  const currentYear = new Date().getFullYear();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chat-list">
      <span className="title">Dashboard</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore Kode AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">Recent chats</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Kode Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
      <hr />
      <div>
        <span className="footer">
          © {currentYear} Kode AI. All rights reserved.
        </span>
      </div>
    </div>
  );
};