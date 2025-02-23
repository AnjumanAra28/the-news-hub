import { Chart } from "react-google-charts";
import SectionTitle from "../../Components/SectionTitle";

const GrowthChart = () => {

    const data = [
        ["Week", "Tech Today", "Science Weekly", "Sports Arena" , "Daily Arena" , "Film Buzz"],
        ["Week 1", 200, 150, 300 ,200 ,400],
        ["Week 2", 300, 250, 350 ,100 ,300],
        ["Week 3", 400, 300, 500 , 150 ,350],
        ["Week 4", 500, 450, 600  , 250 , 300],
    ];

    const options = {
        chart: {
            title: "Views of Articles",
            subtitle: "View Count of different Publishers",
        },
    };
    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <SectionTitle heading={'Views of Articles'} subHeading={'Article views over the period'}></SectionTitle>
            <Chart
                chartType="Line"
                width="90%"
                height="400px"
                data={data}
                options={options}
                className="mx-auto"
            />
        </div>
    );
};

export default GrowthChart;