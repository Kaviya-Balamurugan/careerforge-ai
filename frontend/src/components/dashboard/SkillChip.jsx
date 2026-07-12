export default function SkillChip({

    skill,

    matched

}){

    return(

        <span

            className={

                matched

                ?

                "skill-chip success"

                :

                "skill-chip danger"

            }

        >

            {skill}

        </span>

    )

}