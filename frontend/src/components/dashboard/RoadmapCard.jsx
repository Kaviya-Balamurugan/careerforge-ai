import { useEffect } from "react";

import useCareer from "../../hooks/useCareer";

import { roadmap as getRoadmap } from "../../api/careerApi";

export default function RoadmapCard() {

    const {

        filename,

        role,

        roadmap,

        setRoadmap

    } = useCareer();

    useEffect(() => {

        async function loadRoadmap() {

            if (!filename) return;

            try {

                const response = await getRoadmap(

                    filename,

                    role

                );

                setRoadmap(

                    response.data

                );

            }

            catch (err) {

                console.error(err);

            }

        }

        loadRoadmap();

    }, [filename, role]);

    return (

        <div className="roadmap-card">

            <h3>

                📚 Learning Roadmap

            </h3>

            {

                roadmap?.roadmap

                ?

                Object.entries(roadmap.roadmap).map(

                    ([week, skill]) => (

                        <div key={week}>

                            <strong>

                                {week}

                            </strong>

                            {" : "}

                            {skill}

                        </div>

                    )

                )

                :

                <p>

                    No roadmap available.

                </p>

            }

        </div>

    );

}