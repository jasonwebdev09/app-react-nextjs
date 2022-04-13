import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import React from "react";
import Link from "next/link";
import axios from "axios";

const Home: NextPage<React.FC> = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:5000/users/login", data);
      const token = JSON.stringify(res.data.token);
      window.sessionStorage.setItem("LOGIN_JWT_TOKEN", token);
      
      console.log(token);
      if (res) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-16 py-16 bg-indigo-400">
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid place-content-center">
        <h1 className="text-3xl text-center">Login</h1>
        <form className="grid-flow-col py-8" onSubmit={handleSubmit(login)}>
          <div className="py-4">
            <label>UserName</label>
            <input
              className="mx-4"
              {...register("username", {
                required: true,
                maxLength: 10,
              })}
              defaultValue=""
            />
          </div>
          <div className="py-4">
            <label>Password</label>
            <input
              type="password"
              className="mx-6"
              {...register("password", {
                required: true,
                maxLength: 10,
              })}
            />
          </div>
          <div className="py-4">
            {errors.username || errors.password ? (
              <p>This field is required</p>
            ) : (
              ""
            )}
            <button className="bg-white px-4 py-2" type="submit">
              Submit
            </button>
          </div>
          <div className="py-4">
            <Link href="/signup">Signup</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
