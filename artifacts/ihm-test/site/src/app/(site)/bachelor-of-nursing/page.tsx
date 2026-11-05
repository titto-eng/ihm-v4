// /bachelor-of-nursing/ — the old standalone page. WordPress (template-bachelor-of-nursing.php) answers 301 to the course URL,
// and so does this route (rule 1: the old URL keeps working, as it did on the live site).
import { permanentRedirect } from 'next/navigation'

export default function BachelorOfNursingRoute() {
  permanentRedirect('/courses/bachelor-of-nursing/')
}
