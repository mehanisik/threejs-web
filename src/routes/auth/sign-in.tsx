import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "@/components/forms/sign-in-form";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { fetchUserFn } from "@/lib/auth";

export const Route = createFileRoute("/auth/sign-in")({
  beforeLoad: async () => {
    const { user } = await fetchUserFn();
    if (user) {
      throw redirect({ to: "/" });
    }
  },
  pendingComponent: () => <div>Loading...</div>,
  component: SignInPage,
});

function SignInPage() {
  return (
    <PageWrapper>
      <SignInForm />
    </PageWrapper>
  );
}
