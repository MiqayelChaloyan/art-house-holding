import { FC, useEffect } from "react";

// import { useAppDispatch } from "@/hooks/useStore";
// import { closeModal } from "@/store/stateModalSlice";

import Main from "./Main";
import About from "./About";
import CookingCourses from "./CookingCourses";
import News from "./News";
import Progress from "./Progress";
import Specialists from "./Specialists";
import OurRating from "./OurRating";

import { EDUCATIONAL_CENTER_DEFAULT } from "../../../../../sanity/sanity-queries/educational-center";


interface Props {
    data: EDUCATIONAL_CENTER_DEFAULT[]
}


const EducationalCenterHome: FC<Props> = ({ data }) => {
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(closeModal());
    // }, []);


    return (
        <>
            {/* <Main data={data} />
            <About data={data} />
            <CookingCourses data={data} />
            <News data={data} />
            <Progress data={data} />
            <Specialists data={data} />
            <OurRating data={data} />  */}
        </>
    )
}

export default EducationalCenterHome;