import React from 'react'
import {useHistory, Link} from 'react-router-dom'

const LandingPage = () =>{
    const history = useHistory();
    return(
        <div className = 'container' style={{backgroundColor:'#5B7B7A'}}>
        <section >
            <div className="topimg">
                <img src="images/bed-linen-1149842_1280.jpg" alt="Bed with pillow and sheets" className = "bed" />
            </div>
        </section>
        <section>
            <div className='sleep-tracker'> <p className= 'txt0'>Understand Your Sleep Schedule</p> </div>
                <div className= "below-img-txt">
                    
                    <span className= 'beg'>What is Sleep Tracker?</span>
                    <p className= 'txt txt1'>  <br />
                    Sleep tracker is a simple yet effective app that allows the user to log how they feel after a nights rest. <br /> <br />
                    Over time, Sleep Tracker will help you improve your sleep patterns which will help improve your morning 
                    every day! 
                    </p>
                    <p className= 'beg'>How Can Sleep Tracker Help You?</p>
                    <p className= 'txt txt2'>
                        We want you to have access to a better understanding of how your sleep affects you. <br /> <br />
                        By tailoring a consistent sleep pattern most beneficial to you, your daily energy 
                        and general mood will increase.  
                    </p>
                </div>
        </section>
    </div>
    )
}

export default LandingPage