export default function ProjectCard(){

    const projects=[

        "Brain Tumor Detection",

        "Smart Parking",

        "Fraud Detection"

    ];

    return(

        <div className="project-card">

            <h3>

                Recommended Projects

            </h3>

            {

                projects.map((project,index)=>(

                    <p key={index}>

                        • {project}

                    </p>

                ))

            }

        </div>

    )

}