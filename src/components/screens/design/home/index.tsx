import Courses from "./courses";
import OurDay from "./our-day";
import OurTeam from "./our-team";
import Partners from "./partners";
import Progress from "./progress";


const Home = () => {

    return (
        <div>
            <div style={{ backgroundColor: 'green', height: '710px' }}></div>
            <Courses />
            <OurDay />
            <Progress/>
            <OurTeam/>
            <Partners/>
        </div>
    )
};

export default Home;