import { useState } from 'react';
import { TiLocationArrow } from "react-icons/ti";
import emailjs from '@emailjs/browser';

const COOLDOWN_TIME = 60000; // 1 minute cooldown
const MAX_ATTEMPTS = 5; // Maximum attempts per session

// Google Apps Script web app URL
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzpfjIfTinA3KvrEFrc-2BfKRdPdU0ZEtXudCYl3hROjCjnA_pn8nfkiiLApNIKo2Ex/exec';

const JoinTeamForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    email: '',
    phone: '',
    study: '',
    interest: '',
    field: '',
    whyUs: '',
    favoriteProject: '',
    showcase: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < COOLDOWN_TIME) {
      setError(`Please wait ${Math.ceil((COOLDOWN_TIME - (now - lastSubmitTime)) / 1000)} seconds before trying again`);
      return;
    }

    // Check maximum attempts
    if (submitAttempts >= MAX_ATTEMPTS) {
      setError('Maximum submit attempts reached. Please try again later.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSubmitStatus({ type: '', message: '' });

    // Simple validation
    const requiredFields = ['name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setSubmitStatus({
        type: 'error',
        message: `Please fill in all required fields: ${missingFields.join(', ')}`
      });
      setIsSubmitting(false);
      return;
    }    try {      // Send data to Google Sheets
      const response = await fetch(SHEET_URL, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          type: 'job_application',
          timestamp: new Date().toISOString()
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors' // This is important for CORS
      });
      
      // Since we're using no-cors, we can't check response.ok
      // We'll assume success unless there's an error
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your interest! We will review your application and get back to you soon.'
      });
      setFormData({
        name: '',
        dob: '',
        address: '',
        email: '',
        phone: '',
        study: '',
        interest: '',
        field: '',
        whyUs: '',
        favoriteProject: '',
        showcase: '',
      });
      setSuccess(true);
      setLastSubmitTime(now);
      setSubmitAttempts(prev => prev + 1);
    } catch (error) {
      console.error("Error submitting form to jointeam:", error);
      setSubmitStatus({
        type: 'error',
        message: `We're having trouble submitting your application. Error: ${error.message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Logo and Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <h2 
              className="special-font hero-heading text-[2rem] sm:text-[3.5rem] font-black tracking-[0.05em] text-white leading-none"
            >
              CO<b>G</b>NISYNC
            </h2>
          </div>
          <h1 className="text-4xl font-zentry mb-4">Join Our Team</h1>
          <p className="text-white/70 font-circular-web">Be part of something extraordinary</p>
        </div>        {/* Status Message */}
        {submitStatus.message && (
          <div className={`mb-8 p-4 rounded-lg text-center ${
            submitStatus.type === 'success' ? 'bg-green-600/20 text-green-400' : 
            submitStatus.type === 'error' ? 'bg-red-600/20 text-red-400' : ''
          }`}>
            {submitStatus.message}
          </div>        )}        <form 
          onSubmit={handleSubmit} 
          className="space-y-8"
        >
          <div className="space-y-6">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-robert-medium mb-2">Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label htmlFor="dob" className="block text-sm font-robert-medium mb-2">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address" className="block text-sm font-robert-medium mb-2">Place of Stay (Address)</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-robert-medium mb-2">Email<span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone" className="block text-sm font-robert-medium mb-2">Phone Number<span className="text-red-500">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
                required
              />
            </div>

            {/* Stream of Study */}
            <div className="form-group">
              <label htmlFor="study" className="block text-sm font-robert-medium mb-2">Stream of Study</label>
              <input
                type="text"
                id="study"
                name="study"
                value={formData.study}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
              />
            </div>

            {/* Area of Interest */}
            <div className="form-group">
              <label htmlFor="interest" className="block text-sm font-robert-medium mb-2">Area of Interest and Why?</label>
              <textarea
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                rows="4"
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
              />
            </div>

            {/* Field to Apply */}
            <div className="form-group">
              <label htmlFor="field" className="block text-sm font-robert-medium mb-2">Field You Want to Apply?</label>
              <input
                type="text"
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
              />
            </div>

            {/* Why Join Us */}
            <div className="form-group">
              <label htmlFor="whyUs" className="block text-sm font-robert-medium mb-2">Among All Others, Why Join Us?</label>
              <textarea
                id="whyUs"
                name="whyUs"
                value={formData.whyUs}
                onChange={handleChange}
                rows="4"
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
              />
            </div>

            {/* Favorite Project */}
            <div className="form-group">
              <label htmlFor="favoriteProject" className="block text-sm font-robert-medium mb-2">Your Favorite Project and Why?</label>
              <textarea
                id="favoriteProject"
                name="favoriteProject"
                value={formData.favoriteProject}
                onChange={handleChange}
                rows="4"
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
              />
            </div>

            {/* Showcase */}
            <div className="form-group">
              <label htmlFor="showcase" className="block text-sm font-robert-medium mb-2">Project Demo/GitHub Links</label>
              <textarea
                id="showcase"
                name="showcase"
                value={formData.showcase}
                onChange={handleChange}
                rows="3"
                placeholder="Share your project demos, GitHub links, or any other relevant work"
                className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:border-violet-300 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative z-10 w-full overflow-hidden rounded-lg bg-black py-4 text-white border border-white/20 transition-colors hover:bg-white hover:text-black"
            >
              <span className="relative inline-flex w-full justify-center overflow-hidden font-general text-xs uppercase">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </div>
                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </div>
              </span>
              <TiLocationArrow className="absolute right-4 top-1/2 -translate-y-1/2 transform group-hover:text-black" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinTeamForm;
