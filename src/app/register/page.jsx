"use client"
import React, { useEffect, useState } from 'react';
import { auth } from '../(firebase)/firebase';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useAuth } from '../(firebase)/auth';
import { useRouter } from 'next/navigation';
import Loader from '../(components)/Loader';
import { toast } from 'react-toastify';

const Register = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: ""
    })
    //context 
    const { authUser, isLoading, setAuthUser } = useAuth();
    //create instance of useRouter
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && authUser) {
            router.push('/');
        }
    }, [authUser, isLoading, router]);


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };



    const signupHandler = async () => {
        if (!state.name || !state.email || !state.password) {
            toast.error('Registration failed. Please try again.')
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, state.email, state.password);
            //method to update/display  all user information including name,email,profile etc.. 
            await updateProfile(auth.currentUser, {
                displayName: state.name
            });
            //to update context state
            setAuthUser({
                uid: user.uid,
                email: user.email,
                username: user.displayName
            });
            console.log(user);

        }

        catch (error) {
            console.log(" user registration  error", error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider);
            console.log(user);
        } catch (error) {
            console.log(" signIn with google error", error);
        }
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            toast.success('Registration successful!');
            setState({
                name: '',
                email: '',
                password: '',
            });

        } catch (error) {
            console.log(error);

        }
    };

    return isLoading || (!isLoading && authUser) ? <Loader /> : (
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Sign Up</h1>
                    <p className="mt-6 ml-1">
                        Already have an account ?{" "}
                        <Link
                            href="/login"
                            className="underline hover:text-blue-400 cursor-pointer"
                        >
                            Login
                        </Link>
                    </p>

                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group">
                        <FcGoogle size={22} />
                        <span
                            className="font-medium text-black group-hover:text-white"
                            onClick={signInWithGoogle}
                        >
                            Login with Google
                        </span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                name='name'
                                value={state.name}
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={onChangeHandler}
                                required
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={state.email}
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={onChangeHandler}
                                required
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={state.password}
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={onChangeHandler}
                                required
                            />
                        </div>
                        <button
                            className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                            onClick={signupHandler}
                        > Sign Up</button>
                    </form>
                </div>
            </div>
            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    )
}

export default Register;
