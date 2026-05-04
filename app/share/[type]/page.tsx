import { personalities } from "@/lib/personalities"
import ShareClient from "./share-client"

export function generateStaticParams() {
  return Object.keys(personalities).map((type) => ({ type }))
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  return <ShareClient type={type} />
}
