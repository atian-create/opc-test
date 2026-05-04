import { personalities } from "@/lib/personalities"
import ResultClient from "./result-client"

export function generateStaticParams() {
  return Object.keys(personalities).map((type) => ({ type }))
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  return <ResultClient type={type} />
}
