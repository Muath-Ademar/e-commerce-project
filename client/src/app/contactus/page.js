'use client'
import axios from 'axios'
import React, { useState } from 'react'

const Page = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/messages`, { userName, email, subject, message })
      .then(res => {
        console.log(res.data.message)
      })
      .catch(err => console.log(err))

    setUserName('')
    setEmail('')
    setSubject('')
    setMessage('')
    alert('Message has been sent')

  }

  return (
    <div className="page-container">
      {/* Hero Section */}


      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-subtitle">We&apos;re here to help and answer any questions you might have.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Contact Form Column */}
        <div className="content-column">
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-subtitle">We&apos;ll get back to you within 24 hours</p>

              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" value={userName} onChange={e => setUserName(e.target.value)} required />
                <div className="input-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                <div className="input-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="How can we help?" />
                <div className="input-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V20H20V8Z" />
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Type your message here..." value={message} onChange={e => setMessage(e.target.value)} required></textarea>
                <div className="input-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                  </svg>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
                <svg viewBox="0 0 24 24">
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="content-column">
          <div className="contact-info">
            <h2 className="info-title">Other Ways to Reach Us</h2>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                </svg>
              </div>
              <div>
                <h3>Our Location</h3>
                <p>123 Business Avenue<br />San Francisco, CA 94107</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                </svg>
              </div>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567<br />Mon-Fri, 9am-5pm PST</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                </svg>
              </div>
              <div>
                <h3>Email</h3>
                <p>hello@company.com<br />support@company.com</p>
              </div>
            </div>

            <div className="social-links">
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background-color: #fffaf5;
          }
          
          .hero-section {
            color: black;
            padding: 4rem 2rem;
            text-align: center;
            }
            
            .hero-title {
              font-size: 2.5rem;
              font-weight: 700;
              margin-bottom: 1rem;
              }

        .hero-subtitle {
          font-size: 1.25rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .main-content {
          max-width: 1200px;
          margin: -3rem auto 0;
          padding: 0 2rem 4rem;
          display: flex;
          gap: 2rem;
        }

        .content-column {
          flex: 1;
        }

        .contact-form-container {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          height: 100%;
        }

        .contact-info {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          height: 100%;
        }

        .info-title {
          color: #2d3748;
          font-size: 1.5rem;
          margin-bottom: 2rem;
          font-weight: 700;
          text-align: center;
        }

        .info-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: flex-start;
        }

        .info-icon {
          background-color: #f3f4f6;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-icon svg {
          width: 1.5rem;
          height: 1.5rem;
          fill: #fe520a;
        }

        .info-item h3 {
          color: #1f2937;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .info-item p {
          color: #6b7280;
          line-height: 1.5;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 3rem;
        }

        .social-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background-color: #e5e7eb;
          transform: translateY(-2px);
        }

        .social-icon svg {
          width: 1.25rem;
          height: 1.25rem;
          fill: #fe520a;
        }

        /* Existing form styles */
        .form-title {
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-align: center;
        }

        .form-subtitle {
          color: #718096;
          margin-bottom: 2rem;
          font-size: 1rem;
          text-align: center;
        }

        .form-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #4a5568;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.8rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #f8fafc;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
          background-color: white;
        }

        .form-group textarea {
          padding-left: 3rem;
          resize: vertical;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 2.5rem;
          color: #a0aec0;
        }

        .input-icon svg {
          width: 1.2rem;
          height: 1.2rem;
          fill: currentColor;
        }

        .submit-btn {
          background: #fe520a;
          color: white;
          border: none;
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .submit-btn:hover {
          background: #e04809;
          transform: translateY(-2px);
        }

        .submit-btn svg {
          width: 1.2rem;
          height: 1.2rem;
          fill: currentColor;
        }

        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
            padding: 0 1rem 2rem;
          }
          
          .hero-section {
            padding: 3rem 1rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .contact-form-container,
          .contact-info {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Page