import SchedulingGuide from "./scheduling.mdx"

import { getMDFrontMatter } from "@/utils/frontmatter-parser"

const Page = () => {
  return (
    <div className="lg:mx-48">
      <SchedulingGuide></SchedulingGuide>
    </div>
  )
}

export default Page
