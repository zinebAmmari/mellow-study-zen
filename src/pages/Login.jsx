import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Se connecter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input input-bordered w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit">Se connecter</Button>
      </form>
    </div>
  );
}
