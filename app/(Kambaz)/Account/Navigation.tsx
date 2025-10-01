import Link from "next/link";
export default function KambazNavigation() {
  return (
    <div id="wd-kambaz-navigation">
      <Link href="/Account/Signin" id="wd-signin-link">
        SignIn
      </Link>
      <br />
      <Link href="/Account/Signup" id="wd-signup-link">
        SignUp
      </Link>
      <br />
      <Link href="/Account/Profile" id="wd-Profile-link">
        Profile
      </Link>
      <br />
    </div>
  );
}
