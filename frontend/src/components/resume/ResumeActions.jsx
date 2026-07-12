import "./Resume.css";

export default function ResumeActions({

    uploading,

    onUpload

}) {

    return (

        <div className="resume-actions">

            <button

                className="primary-btn"

                onClick={onUpload}

                disabled={uploading}

            >

                {

                    uploading

                    ?

                    "Uploading..."

                    :

                    "Upload Resume"

                }

            </button>

        </div>

    );

}