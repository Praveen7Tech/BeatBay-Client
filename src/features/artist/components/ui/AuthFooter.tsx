import { Link, useLocation } from "react-router-dom";

export function AuthFooter() {
  const location = useLocation();
  const isSignup = location.pathname.toLowerCase().includes("signin");

  console.log("Path:", location.pathname);


  return (
    <p className="text-white/80 text-sm text-center">
      {!isSignup ? (
        <>
          Already have an account?{" "}
          <Link
            to="/artist-signin"
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </>
      )
       : (
        <>
          Don't have an account?{" "}
          <Link
            to="/artist"
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
          >
            Register
          </Link>
        </>
      )
    }
    </p>
  );
}
