import { Link, useLocation } from "react-router-dom";

export function AuthFooter() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  let content;

  if (path === "/artist") {
    content = (
      <>
        Already have an account?{" "}
        <Link
          to="/artist-signin"
          className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
        >
          Sign In
        </Link>
      </>
    );
  } else if (path === "/artist-signin") {
    content = (
      <>
        Don't have an account?{" "}
        <Link
          to="/artist"
          className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
        >
          Register
        </Link>
      </>
    );
  } else if (path === "/artist-forgot-password") {
    content = (
      <>
        Remembered your password?{" "}
        <Link
          to="/artist-signin"
          className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
        >
          Sign In
        </Link>
      </>
    );
  }

  return <p className="text-white/80 text-sm text-center">{content}</p>;
}
