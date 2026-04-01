import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Hardcoded login check
      if (email === "admin@idhayaraja.com" && password === "password123") {
        localStorage.setItem("admin_auth_token", "true");
        toast.success("Welcome back, Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-gradient-gold mb-2">Admin Panel</h1>
          <p className="text-sm text-muted-foreground font-alt">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card rounded-2xl p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-alt uppercase tracking-wider text-muted-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@idhayaraja.com"
              required
              className="bg-secondary/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-alt uppercase tracking-wider text-muted-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-secondary/50 border-border"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            <LogIn size={16} />
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-xs text-muted-foreground hover:text-primary font-alt transition-colors">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
