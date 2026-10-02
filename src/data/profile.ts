import { certifications } from './certifications'
import { personalProjects } from './personalProjects'
import { projects } from './projects'

export const profileStats = {
  cgpa: '3.42',
  projectCount: new Set([...projects, ...personalProjects].map(project => project.id)).size,
  credentialCount: certifications.length,
}
