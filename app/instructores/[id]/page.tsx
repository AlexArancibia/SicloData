import Layout from "@/components/kokonutui/layout"
import InstructorDetail from "@/components/reservas/instructor-detail"

interface InstructorPageProps {
  params: {
    id: string
  }
}

export default function InstructorPage({ params }: InstructorPageProps) {
  return (
    <Layout>
      <InstructorDetail instructorId={params.id} />
    </Layout>
  )
}
