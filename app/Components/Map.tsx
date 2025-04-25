import React from "react";

const Map = () => {
  return (
    <div className="w-full max-w-7xl mb-6 mt-[1rem]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.120508143489!2d77.45366627518135!3d28.656110175651918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1006742dad5%3A0x4ccd78c119070a!2sNexgen%20Industrial%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1741590450104!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Map;
