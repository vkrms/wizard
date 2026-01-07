import Link from "next/link"

export default function Home() {
  return (
    <div className="temp">
      <h1>Hello World</h1>
      <Link href="/wizard/step1">Step 1</Link>
    </div>
  );
}
