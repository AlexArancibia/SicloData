import Layout from "@/components/kokonutui/layout"
import ComprasTabla from "@/components/reservas/compras-tabla"

export default function ComprasPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <ComprasTabla />
      </div>
    </Layout>
  )
}