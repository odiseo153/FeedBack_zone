import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  /* --------- Inertia form ---------- */
  const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
    email: 'admin@feedbackzone.com',
    password: 'password',
    remember: false,
  });

  /* --------- Submit ---------- */
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), { onFinish: () => reset('password') });
  };

  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in"
    >
      <Head title="Log in" />

      {/* ===== Card Wrapper (centered) ===== */}
      <div className=" items-center justify-center ">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-gray-200 transition-all hover:shadow-3xl">
          <header className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Log in</h2>
            <p className="text-sm text-gray-600 mt-1">
              Enter your credentials to access your dashboard
            </p>
          </header>

          {/* ===== Form ===== */}
          <form className="space-y-6" onSubmit={submit}>
            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-1 flex items-center gap-1 text-gray-700">
                <Mail className="h-4 w-4" />
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                required
                autoFocus
                tabIndex={1}
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="email@example.com"
                className="mt-1"
              />
              <InputError message={errors.email} />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="password" className="flex items-center gap-1 text-gray-700">
                  <LockKeyhole className="h-4 w-4" />
                  Password
                </Label>

                {canResetPassword && (
                  <TextLink href={route('password.request')} className="text-sm" tabIndex={5}>
                    Forgot password?
                  </TextLink>
                )}
              </div>

              <Input
                id="password"
                type="password"
                required
                tabIndex={2}
                autoComplete="current-password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Password"
                className="mt-1"
              />
              <InputError message={errors.password} />
            </div>

            {/* Remember & Sign Up link */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={data.remember}
                  onClick={() => setData('remember', !data.remember)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>

              <TextLink href={route('register')} className="text-sm" tabIndex={5}>
                Sign up
              </TextLink>
            </div>

            {/* Submit */}
            <Button type="submit" className="mt-4 w-full" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
              Log in
            </Button>
          </form>
        </div>
      </div>

      {/* === Status Message === */}
      {status && (
        <div className="mt-6 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </AuthLayout>
  );
}
