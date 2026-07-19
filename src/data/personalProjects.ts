import { Hand } from 'lucide-react'
import type { Project } from './projects'

export const personalProjects: Project[] = [
  {
    id: 'domain-expansion',
    tag: 'Computer Vision · Personal Project',
    title: 'Domain Expansion Classifier',
    description:
      'A real-time computer vision app that recognizes anime-inspired hand-sign gestures via webcam and triggers custom animated effects — built to learn CNNs, transfer learning, and real-time inference hands-on.',
    // Stylized pipeline illustration — swap for 'domain-expansion-demo.png' once a real demo capture exists.
    image: 'domain-expansion-illustration.png',
    placeholderIcon: Hand,
    tech: ['Python', 'PyTorch', 'torchvision (MobileNetV2)', 'OpenCV', 'MediaPipe', 'scikit-learn'],
    links: [
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/domain-expansion-classifier', icon: 'github' },
    ],
    caseStudyId: 'domain-expansion',
  },
]

export const domainExpansionHighlight =
  'Trained a CNN from scratch and compared it against transfer learning (MobileNetV2), then built a live webcam app with multi-person "clash" detection when two different signs are held at once.'
