import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Fetch user data from Redux store, handling the case when it's not ready yet
  const User = useSelector((state) => state.stores.user);
  const UserSign = useSelector((state) => state.stores.userSignUp);

  // Ensure User object is defined before accessing any properties
  const USER = User?.UserName || "Guest"; // Safely handle undefined or null User, default to "Guest"
  const verifiedUser = UserSign?.isVerified || false; // Fallback to false if isVerified is not set

  const Writer = useSelector((state) => state.stores.formDataWriter);

  const [verifyAlert, setverifyAlert] = useState(false);

  const login_alert = () => {
    setverifyAlert(true);
    setTimeout(() => {
      setverifyAlert(false);
    }, 10000);
  };

  // Manage user in localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Update localStorage when user changes
    }
  }, [user]);

  // Timer state management
  const [timerActive, setTimerActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(0);

  const updateTimer = () => {
    if (timerActive && timerRemaining > 0) {
      setTimerRemaining((prevRemaining) => prevRemaining - 1);
    }
  };

  useEffect(() => {
    let interval;

    if (timerActive && timerRemaining > 0) {
      interval = setInterval(updateTimer, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive, timerRemaining]);

  const startTimer = (initialTime) => {
    setTimerActive(true);
    setTimerRemaining(initialTime);
  };

  const stopTimer = () => {
    setTimerActive(false);
    setTimerRemaining(0);
  };

  // Memoizing the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      verifiedUser,
      USER, // Safe, since it's set to "Guest" if User is null
      Writer,
      User, // Still passing the User object, even if it's undefined
      user,
      setUser,
      verifyAlert,
      login_alert,
      timerActive,
      timerRemaining,
      startTimer,
      stopTimer,
    }),
    [
      verifiedUser,
      USER,
      Writer,
      User,
      user,
      verifyAlert,
      timerActive,
      timerRemaining,
    ]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
