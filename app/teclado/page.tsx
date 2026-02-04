import { redirect } from "next/navigation"
export default function Page({ params }: { params: { keyword: string } }) {
  redirect(`/accesorios/teclados/${params.keyword}`)
}
