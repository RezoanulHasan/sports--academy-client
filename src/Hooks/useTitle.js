import { useEffect } from "react"

const useTitle = title => {

    useEffect (() => {
document.title= `  ${title}-Sports academies`

    },[title])
};

export default  useTitle ;