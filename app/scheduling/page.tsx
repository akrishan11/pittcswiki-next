import Link from "next/link"
import CourseListing from "@/components/Courses/CourseListing"
import CourseGraph from "@/components/Courses/CourseGraph"

import { CourseInfoData } from "@/data/CourseInfoData"
import { courseCategorizer } from "@/utils/course-categorizer"

const categorizedCourses = courseCategorizer(CourseInfoData.courses)

export default function CoursesPage() {
  const reqs = [
    ["CMP401", "CS445"],
    ["CS445", "CS447"],
    ["CS447", "CS449", { type: "coreq" }],
    ["CS449", "CS1501"],
  ]
  return (
    <div className="w-144 h-96">
      <CourseGraph></CourseGraph>
    </div>
  )
}
