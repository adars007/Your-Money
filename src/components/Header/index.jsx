import React, { useEffect, useState } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg";
function Header() {
  // React-firebase-hooks is a react hook which is used to keep you logged in until unless you logout
  const [user, loading] = useAuthState(auth);
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDarkMode"))
  );
  if (isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged Out Succesfully", { autoClose: 800 });
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message, { autoClose: 800 });
        });
    } catch (e) {
      toast.error(e.message, { autoClose: 800 });
    }
  }
  return (
    <div className="navbar">
      <p
        className="theme-changer"
        onClick={() => {
          setIsDark(!isDark);
          localStorage.setItem("isDarkMode", !isDark);
        }}
      >
        <i className={`fa-solid fa-${isDark ? `sun` : `moon`}`} />
        &nbsp;&nbsp;
      </p>
      <p className="logo">PennyWise.</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            style={{ borderRadius: "50%", height: "1.5rem", width: "1.5rem" }}
          />
          <p className="logo link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
