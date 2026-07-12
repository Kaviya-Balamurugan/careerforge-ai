export default function RoadmapCard(){

    const roadmap=[

        "TensorFlow",

        "PyTorch",

        "OpenCV"

    ];

    return(

        <div className="roadmap-card">

            <h3>

                Learning Roadmap

            </h3>

            {

                roadmap.map((skill,index)=>(

                    <div key={index}>

                        Week {index+1}

                        —

                        {skill}

                    </div>

                ))

            }

        </div>

    )

}