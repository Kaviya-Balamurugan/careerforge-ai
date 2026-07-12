import {
    PieChart,
    Pie,
    Cell,
    Tooltip
} from "recharts";

const COLORS = [

    "#22C55E",

    "#EF4444"

];

export default function SkillChart() {

    const data = [

        {
            name: "Matched",
            value: 12
        },

        {
            name: "Missing",
            value: 8
        }

    ];

    return (

        <div className="chart-card">

            <h3>Skill Distribution</h3>

            <PieChart
                width={300}
                height={260}
            >

                <Pie

                    data={data}

                    dataKey="value"

                    outerRadius={90}

                >

                    {

                        data.map((entry,index)=>

                            <Cell

                                key={index}

                                fill={COLORS[index]}

                            />

                        )

                    }

                </Pie>

                <Tooltip/>

            </PieChart>

        </div>

    );

}