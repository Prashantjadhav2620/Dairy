import React from 'react';

const contactData = () => {
  return (
    <div className="flex justify-between p-20">
      {/* Contact Details */}
      <div className="w-1/2">
        <h2>Contact Us</h2>
        <p>
          H. No.8-2-293/82/A/1286,<br/>
          Plot No.1286,<br/>
          Road No. 1 & 65, Jubilee Hills,<br/>
          Hyderabad – 500 033<br/>
          Phone: 040 - 2339 1221 / 222<br/>
          Fax: 040 - 4212 9999<br/>
          Alternate Phone: 040 – 2331 8090 / 040 – 2332 6789<br/>
          Email: <a href="mailto:hfl@heritagefoods.in" className="text-blue-500">hfl@heritagefoods.in</a>
        </p>
      </div>

      {/* Contact Form */}
      <div className="w-1/2">
        <form>
          <label htmlFor="name" className="block mb-2">Name</label>
          <input type="text" id="name" name="name" required className="w-full p-2 mb-4 border rounded" />

          <label htmlFor="email" className="block mb-2">E-mail</label>
          <input type="email" id="email" name="email" required className="w-full p-2 mb-4 border rounded" />

          <label htmlFor="website" className="block mb-2">Website</label>
          <input type="url" id="website" name="website" required className="w-full p-2 mb-4 border rounded" />

          <label htmlFor="subject" className="block mb-2">Subject</label>
          <input type="text" id="subject" name="subject" required className="w-full p-2 mb-4 border rounded" />

          <label htmlFor="message" className="block mb-2">Message</label>
          <textarea id="message" name="message" rows="4" required className="w-full p-2 mb-4 border rounded"></textarea>

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default contactData;
