import { Link } from "@tanstack/react-router";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center">
      <h1>Log In</h1>
      <input type="text" placeholder="Enter username..." />
      <input type="password" placeholder="Enter password..." />
      <button type="submit">Log In</button>
      <p>
        Don't have an account yet?{" "}<Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
