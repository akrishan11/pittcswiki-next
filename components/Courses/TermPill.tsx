import { TermsOfferedType } from "@/types/CoursesDataType"

type TermPillProps = {
  termsMap: TermsOfferedType
}

const TermPills = ({ termsMap }: TermPillProps) => {
  return (
    <div className="m-0">
      <span
        className={
          " py-1 px-2 mr-2 " +
          (termsMap.FALL
            ? "bg-green-500  rounded-md text-white "
            : "text-gray-300")
        }
      >
        FALL
      </span>
      <span
        className={
          " px-2 py-1 mr-2 " +
          (termsMap.SPRING
            ? "bg-green-500 text-white rounded-md "
            : "text-gray-300")
        }
      >
        SPRING
      </span>
      <span
        className={
          " py-1 px-2 " +
          (termsMap.SUMMER
            ? "bg-green-500  text-white rounded-md"
            : "text-gray-300")
        }
      >
        SUMMER
      </span>
    </div>
  )
}

export default TermPills
