import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
function App() {
  const [showerror, setshowerror] = useState(false);
  const [count, setcount] = useState(1);
  const demoitems = [
    {
      name: "Add a task",
    },
  ];
  const [inputvalue, setinputvalue] = useState("");
  const [items, setitems] = useState(demoitems);
  const [ison, setison] = useState(false);
  const [touched, settouched] = useState(false);
  const [theme, settheme] = useState("dark-theme");
  const findedtask = items.find((item) => item.name === inputvalue);
  let message = "Enter the task";
  if (findedtask) {
    message = "Task already added";
  }
  const invalidinput = inputvalue.length === 0 && touched;
  console.log(invalidinput);
  const spring = { type: "spring", stiffness: 700, damping: 30 };
  const addtodolist = () => {
    settouched(true);
    if (inputvalue.length === 0) {
      console.log("invalid");
      setshowerror(true);
      if (showerror) {
        const newcount = count + 1;
        setcount(newcount);
      }
    } else {
      if (findedtask) {
        if (showerror) {
          const newcount = count + 1;
          setcount(newcount);
        } else {
          setshowerror(true);
        }
      } else {
        const todolist = { name: inputvalue };
        setitems([...items, todolist]);
        setinputvalue("");
        setshowerror(false);
        settouched(false);
      }
    }
  };
  const removetodolist = (id) => {
    const newarr = [...items];
    const index = newarr.findIndex((obj) => obj.name === id);
    newarr.splice(index, 1);
    setitems(newarr);
    setshowerror(false);
    settouched(false);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)",
    },
  };
  return (
    <div className="App">
      <div className="main-section">
        <div className="todo-main-content">
          <div className="top-section">
            <div className="todo-logo">Todo App</div>

            <div
              onClick={() => {
                setison(!ison);
                if (theme === "light-theme") {
                  settheme("dark-theme");
                } else {
                  settheme("light-theme");
                }
              }}
              className="dark-light-mode"
              data-ison={ison}
            >
              <MdDarkMode className="lightmode-icon" />
              <MdOutlineLightMode className="darkmode-icon" />
              <motion.div
                className="dark-light-inner-circle"
                layout
                transition={spring}
              >
                {!ison ? (
                  <MdDarkMode className="mode-icon" />
                ) : (
                  <MdOutlineLightMode className="mode-icon" />
                )}
              </motion.div>
            </div>
          </div>
          <div className="todo-add-section">
            <div
              className={
                invalidinput
                  ? "todo-add-inner-container invalid-input"
                  : "todo-add-inner-container "
              }
            >
              <input
                onChange={(event) => {
                  setinputvalue(event.target.value);
                  settouched(true);
                  setshowerror(false);
                }}
                className={"todo-add-input"}
                placeholder="New Task"
                value={inputvalue}
              ></input>
              <button className="todo-add-button" onClick={addtodolist}>
                Add
              </button>
            </div>
            {showerror ? (
              <motion.div
                key={count}
                animate={{ x: [10, -10, 10, -10, 10, 5] }}
                transition={{
                  times: [0, 1],
                }}
                className="Error-message"
              >
                <svg
                  role="img"
                  height="16"
                  width="16"
                  aria-hidden="true"
                  aria-label="Error:"
                  className="error-svg"
                  viewBox="0 0 16 16"
                  data-encore-id="icon"
                >
                  <path d="M0 8a8 8 0 1116 0A8 8 0 010 8zm7.25-5v7h1.5V3h-1.5zm0 8.526v1.5h1.5v-1.5h-1.5z"></path>
                </svg>
                {message}
              </motion.div>
            ) : null}
          </div>
          <div className="todo-list-section">
            <div className="todo-list-inner-container">
              <AnimatePresence>
                {items.map((id) => (
                  <motion.div
                    className="todo-list-main-container"
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring" }}
                    key={id.name}
                  >
                    <div className="todo-list-name">{id.name}</div>
                    <button
                      className="todo-list-remove-button"
                      onClick={() => removetodolist(id.name)}
                    >
                      X
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
