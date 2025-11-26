import ContactForm from '../Support &Academy/ContactForm';
import FAQSection from '../Support &Academy/FAQSection';
import AcademyVideo from '../Support &Academy/AcademyVideo';
import FloatingChat from '../Support &Academy/FloatingChat';

const Support = () => {
  return (
    <div className="min-h-screen bg-white pt-6 px-3 pb-12 font-display relative">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-xl lg:text-4xl font-bold text-black mb-12">Have Questions?</h1>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <ContactForm />
          <FAQSection />
        </div>

        <AcademyVideo />

      </div>

      <FloatingChat />
    </div>
  );
};

export default Support;