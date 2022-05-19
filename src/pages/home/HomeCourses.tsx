import "./style/homeCourses.scss"
import coursePlaceholder from "../../assets/images/courses.png";
import whatsApp from "../../assets/images/whatsapp.svg";

export default function HomeCourses() {
    return (
        <section id="courses" className="section">
            <div className="container">
                <h3 className="text-center section-title">Courses</h3>
                <div className="row">
                    <div className="col-lg-6 col-md-12 pl-0 pt-70 pr-5">
                        <div className="courses-vector">
                            <img src={coursePlaceholder} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 pl-4">
                        <div className="courses-info">
                            <h3>OET Classes</h3>
                            <p>Exclusively for Healthcare Professionals. ​<br className="d-none d-xl-block" />
                            Comprehensive classes for <strong>Writing, Speaking, Listening & Reading</strong> with ample study materials and live interactivepractice sessions.</p>
                            <div className="course-details">
                                <h4>
                                    Yes, cracking OET is the best way for a health professional to go abroad. Join us for
                                </h4>
                                <ul>
                                    <li>FACE-TO-FACE INTERACTIVE SESSIONS.</li>
                                    <li>Only 4 students in a batch.</li>
                                    <li>Flexible timings. (Exclusive Night Batches)</li>
                                    <li>Special attention on writing and speaking</li>
                                    <li>Personalized training.</li>
                                    <li>All modules will be covered in detail.</li>
                                    <li>Mock tests.</li>
                                    <li>Unlimited letter corrections</li>
                                    <li>100 hours of Practice Materials ( Listening and Reading)</li>
                                </ul>
                                <h5>Fees:</h5>
                                <ul className="ng-star-inserted">
                                    <li className="ng-star-inserted">
                                        <h6>OET 2 Months  - <b>₹ 13000/-</b></h6>
                                    </li>
                                    <li className="ng-star-inserted">
                                        <h6>OET 1 Month  - <b>₹ 9000/-</b></h6>
                                    </li>
                                    <li className="ng-star-inserted">
                                        <h6>OET Extension Fee - <b>₹ 5000/-</b></h6>
                                    </li>
                                    <li className="ng-star-inserted">
                                        <h6>OET after Spoken English  - <b>₹ 11500/-</b></h6>
                                    </li>
                                    <li className="ng-star-inserted">
                                        <h6>OET 3 Months - <b>₹ 18000/-</b></h6>
                                    </li>
                                    <li className="ng-star-inserted">
                                        <h6>OET Speaking Only - <b>₹ 7000/-</b></h6>
                                    </li>
                                </ul>
                            </div>
                            <a className="register-btn" href="#">Register</a>
                            <a className="whatapp-btn" href="https://wa.me/916235462408?text=Hai,%20I%20would%20like%20to%20know%20more%20about%20joining%20in%20Manglish%20World" target="_blank">
                                <img src={whatsApp} className="whatsapp-icon"/> Whatsapp
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}