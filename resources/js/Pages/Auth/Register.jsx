import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent } from "@/Components/ui/card";
import { Moon, Sun } from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <>
            <Head title="Register" />

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
                            alt="Register Illustration"
                            className="h-full w-full object-cover"
                        />
                    </div>


                    <div className="w-full lg:w-1/2 p-8">
                        <CardContent className="p-0">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                                    Create Account
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
                                        type="text"
                                        placeholder="Full Name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
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

                                <div>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                        className="dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 text-lg rounded-xl"
                                >
                                    {processing ? "Loading..." : "Register"}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Already have an account?{" "}
                                    <Link
                                        href={route("login")}
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Login
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
