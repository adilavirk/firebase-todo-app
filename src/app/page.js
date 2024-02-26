"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "./(firebase)/auth";
import { useRouter } from "next/navigation";
import Loader from "./(components)/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./(firebase)/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";

export default function Home() {
  //states to set input values into db and to get data from database in array
  const [todoInput, setTodoInput] = useState("");
  const [getTodos, setGetTodos] = useState([]);
  // function to show toast message
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  //context
  const { authUser, isLoading, signOut } = useAuth();
  //create instance of useRouter
  const router = useRouter();
  //when user is not loggedIn and user tries to access homepage/todos-page
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
    if (authUser) {
      fetchTodos(authUser.uid);
    }
  }, [authUser, isLoading, router]);

  const addToDos = async () => {
    try {
      let todo = {
        author: authUser.uid,
        content: todoInput,
        completed: false,
      };
      const collectionName = collection(db, "todos");
      const addTodo = await addDoc(collectionName, todo);
      console.log("Document written with ID: ", addTodo.id);
      fetchTodos(authUser.uid);
      setTodoInput("");
    } catch (error) {
      console.log("error occurred while adding todo", error);
    }
  };

  const fetchTodos = async (uid) => {
    try {
      const collectionName = collection(db, "todos");
      const authorTodos = query(collectionName, where("author", "==", uid));
      const getTodos = await getDocs(authorTodos);
      let data = [];
      getTodos.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setGetTodos(data);

      // const collectionName = collection(db, "todos");
      // await getDocs(collectionName);
    } catch (error) {
      console.log("error occurred while fetching todos", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
      fetchTodos(authUser.uid);
    } catch (error) {
      console.log("error occurred while deleting todo", error);
    }
  };
  const makeAsCompleteHandler = async (event, docId) => {
    try {
      const docRef = doc(db, "todos", docId);
      await updateDoc(docRef, {
        completed: event.target.checked,
      });
      fetchTodos(authUser.uid);
    } catch (error) {
      console.log("error occurred while updating todo", error);
    }
  };
  const onKeyUp = (event) => {
    if (event.key === "Enter" && todoInput.length > 0) {
      addToDos();
    }
  };

  return !authUser ? (
    <Loader />
  ) : (
    <main className="">
      <div
        className="bg-black text-white w-44 py-4 mt-10 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer"
        onClick={signOut}
      >
        <GoSignOut size={18} />
        <span>Logout</span>
      </div>
      <div className="max-w-3xl mx-auto mt-10 p-8">
        <div className="bg-white -m-6 p-3 sticky top-0">
          <div className="flex justify-center flex-col items-center">
            <span className="text-7xl mb-10">📝</span>
            <h1 className="text-5xl md:text-7xl font-bold">ToooDooo's</h1>
          </div>
          <div className="flex items-center gap-2 mt-10">
            <input
              placeholder={`👋 Hello ${authUser.username}, What to do Today?`}
              type="text"
              className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
              autoFocus
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              onKeyUp={onKeyUp}
            />
            <button
              className="w-[60px] h-[60px] rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8]"
              onClick={addToDos}
            >
              <AiOutlinePlus size={30} color="#fff" />
            </button>
          </div>
        </div>
        <div className="my-10">
          {getTodos.length > 0 &&
            getTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between mt-4"
              >
                <div className="flex items-center gap-3">
                  <input
                    id={`todo-${todo.id}`}
                    type="checkbox"
                    className="w-4 h-4 accent-green-400 rounded-lg"
                    checked={todo.completed}
                    onChange={(e) => makeAsCompleteHandler(e, todo.id)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`font-medium ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.content.replace(/'/g, "&apos;")}
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <MdDeleteForever
                    size={24}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => deleteTodo(todo.id)}
                  />
                </div>
              </div>
            ))}

          {/* {todos.length < 1 && (
                <span className="text-center w-full block text-2xl font-medium text-gray-400 mt-28">{`🥹 You don't have todo's`}</span>
            )} */}
        </div>
      </div>
    </main>
  );
}
