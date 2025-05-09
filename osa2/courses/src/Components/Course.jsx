import Header from "./Header";
import Content from "./Content";

const Course = ({course}) => {
    return (
        <>
            <Header txt={course.name}/>
            <Content parts={course.parts}/>
        </>
    );
};

export default Course;