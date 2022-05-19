import "./style/aboutUs.scss";
import aboutUsVector from "../../assets/images/about-us.png";

export default function AboutUs() {
    return (
        <section id="about-us">
            <div className="container">
                <h3 className="text-center section-title">About</h3>
                <div className="row">
                    <div className="col-lg-6 col-md-12 pl-4">
                        <h4 className="sub-title">A lifetime confidence starts here!</h4>
                        <p>
                            We at Manglish world strive to deliver an unmatched learning experience to our students through a unique pedagogy which
                            builds confidence in students and enables them to learn fast. Manglish World, under the company <strong>VINFOTRAIN Private Limited</strong> was
                            founded on 20th october 2020 with a hope to help the young aspirants who are planning to study abroad during the Covid – 19 Pandemic.
                        </p>
                        <p>
                            <strong>Manglish world</strong> penetrated this extremely crowded industry by growing organically through social media platforms where we
                            helped more than <strong>500k students</strong> to build their confidence through our engaging and versatile content.
                            The overwhelming response from the student community inspired us to make the Manglish world more organised and
                            accessible to anyone and everyone who wants to learn or improve their English. Starting with IELTS, 
                            we now have a team of 20 highly qualified experts to impart training.
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="about-us-vector">
                            <img src={aboutUsVector} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}