import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { Loader, Lock, User } from "lucide-react";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: async (userData) => axiosInstance.post("/auth/login", userData),

    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="flex items-center gap-2 input input-bordered w-full">
        <User className="text-gray-400" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 bg-transparent outline-none"
          required
        />
      </div>
      <div className="flex items-center gap-2 input input-bordered w-full">
        <Lock className="text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 bg-transparent outline-none"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
