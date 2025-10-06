import React from "react";
import { useNavigate } from "react-router-dom";

const APP_TITLE = "Job Tracker";
const APP_SLOGAN = "Your Next Opportunity, Organized.";

function Home() {
  const navigate = useNavigate();

  // High-quality, professional workspace image from Unsplash
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    // 1. **Background Container:** Set the background image styles
    <div 
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}
    >
      
      {/* 2. **Overlay for Readability:** Dark (black) overlay with 50% opacity. 
             This makes the text on the card pop and prevents the image from being distracting. */}
      <div 
        className="position-absolute w-100 h-100" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 1 
        }}
      ></div>

      {/* 3. **Content Card:** White background ensures maximum contrast and readability for the text. 
             Positioned with a high zIndex to sit on top of the overlay. */}
      <div 
        className="p-5 bg-white shadow-lg rounded text-center position-relative" 
        style={{ maxWidth: '450px', width: '90%', zIndex: 2 }}
      >
        <h1 className="display-4 fw-bold text-dark mb-2">
          {APP_TITLE}
        </h1>
        <p className="lead text-secondary mb-4 border-bottom pb-3">
          {APP_SLOGAN}
        </p>
        
        {/* Call to Action Buttons */}
        <div className="d-grid gap-3">
          <button 
            className="btn btn-primary btn-lg fw-bold" 
            onClick={() => navigate("/login")}
          >
            Log In to Track Jobs
          </button>
          <button 
            className="btn btn-outline-dark btn-lg" 
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
      
      {/* 4. **Footer Accent:** Text color changed to white ('text-white') for visibility against the dark overlay. */}
      <small className="text-white mt-4 position-relative" style={{ zIndex: 2 }}>
        Start your professional journey today.
      </small>
    </div>
  );
}

export default Home;