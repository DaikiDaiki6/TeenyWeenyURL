import { Link } from "@tanstack/react-router";

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center">
      <h1>Sign In</h1>
      <input type="text" placeholder="Enter username..." />
      <input type="password" placeholder="Enter password..." />
      <input type="password" placeholder="Confirm Password..." />
      <button type="submit">Sign In</button>
      <p>
        Already have an account?{" "}<Link to="/">Log up</Link>
      </p>
    </div>
  );
}
