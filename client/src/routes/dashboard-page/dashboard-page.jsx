import { QueryClient, useMutation } from "@tanstack/react-query";
import "./dashboard-page.css";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };

  return (
    <div className="dashboard-page">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>Kode AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/person1.png" alt="" />
            <span>Create a new chat</span>
          </div>
          <div className="option">
            <img src="/person2.png" alt="" />
            <span>Analyze images</span>
          </div>
          <div className="option">
            <img src="/person3.png" alt="" />
            <span>Optimize code</span>
          </div>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};
