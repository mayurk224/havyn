import { cn } from "@/lib/utils"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { Link, useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}) {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-xl font-bold">Welcome to Havyn</h1>
          <FieldDescription>
            Don&apos;t have an account? <Link to="/signup" className="underline">Sign up</Link>
          </FieldDescription>
        </div>
        
        <Field className="flex justify-center py-2">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const res = await loginWithGoogle(credentialResponse.credential);
              if (res.success) {
                toast.success("Successfully logged in!");
                navigate("/");
              } else {
                toast.error(res.message || "Failed to login with Google.");
              }
            }}
            onError={() => {
              toast.error("Google Login failed. Please try again.");
            }}
            useOneTap
          />
        </Field>

        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our <Link to="/terms" className="underline">Terms of Service</Link>{" "}
          and <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
