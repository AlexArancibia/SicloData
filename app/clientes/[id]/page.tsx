import Layout from "@/components/kokonutui/layout"
import ClienteDetail from "@/components/reservas/cliente-detail"

interface ClientePageProps {
  params: {
    id: string
  }
}

export default function ClientePage({ params }: ClientePageProps) {
  return (
    <Layout>
      <ClienteDetail clienteId={params.id} />
    </Layout>
  )
}
