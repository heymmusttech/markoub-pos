// src/pages/Login.jsx
import { onSignin } from "@/api/services/auth-service";
import { logo } from "@/common";
import { ErrorResponse } from "@/interfaces";
import { AuthSchema, AuthType } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import useAuthStore from "../../store/auth-store";

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(AuthSchema),
    });

    const { login } = useAuthStore((state) => state);

    const onSubmit = async (data: AuthType) => {
        try {
            const { email, password } = data;
            const result = await onSignin({ email, password });
            const { role, tokens, ...rest } = result;

            await login({ ...rest }, role);
            if (role === "admin") navigate("/dashboard");
            if (role === "vendor") navigate("/vendor");

            toast("You have successfully logged in!", {
                description: "You can now access your account.",
                action: {
                    label: "Ok",
                    onClick: () => { },
                },
            });
        } catch (error) {
            console.error("Login failed:", error);

            const { response } = error as AxiosError<ErrorResponse>;
            const message = response?.data?.message! || "Something went wrong.";

            toast("Login failed! Please try again.", {
                description: message,
                action: {
                    label: "Ok",
                    onClick: () => { },
                },
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 gap-8">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <Card className="w-full max-w-[500px]">
                <CardHeader>
                    <CardTitle>Welcome Back!</CardTitle>
                    <CardDescription>
                        Please enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-col w-full gap-3">
                        <div className="flex flex-col items-start justify-start w-full gap-1">
                            <Label htmlFor="name" className="text-xs">
                                Name
                            </Label>
                            <Input
                                id="name"
                                {...register("email")}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col items-start justify-start w-full gap-1">
                            <Label htmlFor="password" className="text-xs">
                                Password
                            </Label>
                            <Input
                                id="password"
                                {...register("password")}
                                type="password"
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="submit" className="w-full" size="lg">
                            Sign In
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <span className="text-slate-500 text-sm">MARKOUB POS - Ticket Point of Sale System - @2025</span>
        </div>
    );
};

export default Login;
