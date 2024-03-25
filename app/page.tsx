import GoogleAuthButton from "./GoogleAuthButton";

export default function Page() {
  return (
    <section className="h-screen pt-24">
      <div className="text-white font-semibold flex flex-col justify-center items-center">
        <h1 className="text-3xl">Sign in</h1>
        <GoogleAuthButton />
      </div>
    </section>
  );
}
