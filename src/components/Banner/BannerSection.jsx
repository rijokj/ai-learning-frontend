import React from 'react'
import './BannerSection.css'
import bannerImg from '../../assets/images/bannerimage.png'

const BannerSection = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="hero-content">
              <h1>Start your AI-learning journey today</h1>
              <p>
                From Our Best Courses Assigned By AI
              </p>
              <button className="cta-button">Explore Courses</button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="hero-image">
              <img src={bannerImg} alt="Learning illustration" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerSection