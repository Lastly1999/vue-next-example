import { useRouter } from "vue-router"

export default function useBackHome() {
  const router = useRouter()
  const backHome = () => {
    router.push("/admin/workbench")
  }
  return { backHome }
}
