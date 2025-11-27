import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent } from "@/Components/ui/card";
import { Moon, Sun } from "lucide-react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <Card
                    className="w-full max-w-4xl flex flex-col lg:flex-row
                rounded-2xl overflow-hidden shadow-2xl
                dark:bg-gray-800 dark:border-gray-700
                min-h-[450px]"
                >
                    <div className="hidden lg:block w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?q=80&w=1170&auto=format&fit=crop"
                            alt="Login Illustration"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 p-8">
                        <CardContent className="p-0">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                                    Login
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleDark}
                                >
                                    <Sun className="h-5 w-5 dark:hidden" />
                                    <Moon className="h-5 w-5 hidden dark:block" />
                                </Button>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Remember me
                                        </span>
                                    </label>

                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 text-lg rounded-xl"
                                >
                                    {processing ? "Loading..." : "Login"}
                                </Button>
                            </form>

                            {/* REGISTER */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Don’t have an account?{" "}
                                    <Link
                                        href={route("register")}
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </>
    );
}
