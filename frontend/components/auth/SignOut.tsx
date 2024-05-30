import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/lib/cognitoActions";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const onSignOut = async () => {
    try {
      await handleSignOut();
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button variant={"outline"} size={"icon"} onClick={onSignOut}>
      <LogOut />
    </Button>
  );
};

export default SignOut;
