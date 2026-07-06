import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_71imiwr';
const EMAILJS_TEMPLATE_ID = 'template_h9raw5g';  
const EMAILJS_PUBLIC_KEY = 'WV54r9mqiifrF2hZM';

const inputClassName = 'w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !message) {
      alert("Name and email can't be empty");
      return;
    }

    setStatus('sending');

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message,
          to_email: 'mavibankal2601@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus('sent');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        setStatus('error');
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 pb-16 pt-32 md:px-16">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center bg-orange-500 p-10 text-white">
            <h1 className="mb-6 text-4xl font-bold">Get in Touch</h1>
            <p className="mb-10 text-lg text-orange-100">
              Have a question about your order or want to partner with us? Our team is always ready to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl">📍</span>
                <p>S-132 Nagli Gav Street, Noida Town, India</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">📞</span>
                <p>+91 8218058872</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">✉️</span>
                <p>support@foodapp.com</p>
              </div>
            </div>
          </div>

          <div className="p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className={inputClassName} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" placeholder="xyz@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClassName} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
                <textarea rows="4" placeholder="How can we help you?" value={message} onChange={(e) => setMessage(e.target.value)} className={inputClassName}></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'sent' && (
                <p className="text-center text-sm text-green-600">Thank you for reaching out! We will get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-red-600">
                  Something went wrong. Please email us directly at support@foodapp.com.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;