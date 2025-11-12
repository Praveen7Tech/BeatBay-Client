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
          className="text-green-500 hover:text-green-400 font-semibold"
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
          className="text-green-500 hover:text-green-400 font-semibold"
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
          className="text-green-500 hover:text-green-400 font-semibold">
          Sign In
        </Link>
      </>
    );
  } else if (path === "/"){
    content = (
      <>
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-500 hover:text-green-400 font-semibold"
        >
          Log In
        </Link>
      </>
    );
  } else if( path === '/login'){
    content = (
      <>
        Don't have an account?{" "}
        <Link
          to="/"
          className="text-green-500 hover:text-green-400 font-semibold"
        >
          Register
        </Link>
      </>
    );
  } else if (path === '/forgot-password'){
    content = (
      <>
        Remembered your password?{" "}
        <Link
          to="/login"
          className="text-green-500 hover:text-green-400 font-semibold">
          Sign In
        </Link>
      </>
    );
  }

  return <p className="text-white/80 text-sm text-center">{content}</p>;
}
