
const ContactForm = () => {
  return (
    <div className="bg-gray-200 rounded-3xl p-5 lg:p-10">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-8">Get in touch</h2>

      <textarea
        placeholder="Type your message here"
        rows={8}
        className="w-full p-5 border bg-white border-gray-300 rounded-2xl resize-none focus:outline-none focus:border-orange-500 transition"
      />

      <button className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm lg:text-xl py-3 lg:py-5 rounded-md cursor-pointer transition">
        Send Message
      </button>
    </div>
  );
};

export default ContactForm;