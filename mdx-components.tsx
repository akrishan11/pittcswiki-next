import type { MDXComponents } from "mdx/types"
import CourseGraph from "@/components/Courses/CourseGraph"
import ElectivesRankingTable from "@/components/ElectivesRankingTable"

const components: MDXComponents = { CourseGraph, ElectivesRankingTable }

export function useMDXComponents(): MDXComponents {
  return components
}
