import { useRouter } from "next/router"
import { useEffect } from "react"
import { Loading } from "~/components/common/Loading"
import { PublicLayout } from "~/components/layout/PublicLayout"
import { withSession } from "~/server/auth/withSession"

export const getServerSideProps = withSession({force: true})

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard/saham")
  }, [router])

  return <PublicLayout>
    <Loading/>
  </PublicLayout>
}
