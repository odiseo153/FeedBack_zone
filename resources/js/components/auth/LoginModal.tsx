import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InputError from '@/components/input-error';
import { Loader2, Eye, EyeOff, Lock, Mail, X } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    title?: string;
    description?: string;
}

export function LoginModal({
    isOpen,
    onClose,
    onSuccess,
    title = "Sign In Required",
    description = "Please sign in to continue with this action."
}: LoginModalProps) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                reset();
                onSuccess?.();
                onClose();
            },
            onError: () => {
                // Errors are handled by the errors object
            },
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            handleClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Lock className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold">
                                    {title}
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-600 mt-1">
                                    {description}
                                </DialogDescription>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClose}
                            className="p-1 h-auto"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email"
                                className="pl-10"
                                required
                                autoFocus
                                autoComplete="email"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                                className="pl-10 pr-10"
                                required
                                autoComplete="current-password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-auto hover:bg-transparent"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <Eye className="w-4 h-4 text-gray-400" />
                                )}
                            </Button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked === true)}
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600">
                            Keep me signed in
                        </Label>
                    </div>

                    {/* General Error Message */}
                    {errors.email && errors.password && (
                        <Alert className="border-red-200 bg-red-50">
                            <AlertDescription className="text-red-700">
                                Please check your credentials and try again.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={processing || !data.email || !data.password}
                            className="w-full"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <div className="text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="border-t pt-4 mt-6">
                    <div className="text-center space-y-2">
                        <a
                            href={route('password.request')}
                            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Forgot your password?
                        </a>
                        <div className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <a
                                href={route('register')}
                                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                            >
                                Sign up here
                            </a>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
