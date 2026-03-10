import React, { useEffect, useState } from 'react';

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
 


  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "" || email === "" || message === "") {
      alert("name oe email can't be empty");
      return;
    }

    // const newEnquiry = {
    //   name: name,
    //   email: email,
    //   message: message
    // };
     console.log(name, email, message);

    setName("");
    setEmail("");
    setMessage("");
  }
  const submitEnter = (event) => {
  if (event.key === "Enter") {
    handleSubmit(event);  
  }
};



  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 lg:px-6 flex items-center justify-center" >
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid md:grid-cols-2">


          <div className="bg-orange-500 p-10 text-white flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-orange-100 mb-10 text-lg">
              Have a question about your order or want to partner with us?
              Our team is here to help you.
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={submitEnter}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="xyz@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={submitEnter}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                ></textarea>
              </div>
              <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-md">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;