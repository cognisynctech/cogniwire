import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "./Button";

const JoinTeamPage = ({ onClose }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    email: "",
    phone: "",
    stream: "",
    interest: "",
    field: "",
    whyUs: "",
    favoriteProject: "",
    showcase: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useGSAP(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Add validation here if needed

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "Place of Stay (Address)", name: "address", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone Number", name: "phone", type: "tel" },
    { label: "Stream of Study", name: "stream", type: "text" },
    { label: "Area of Interest and Why", name: "interest", type: "textarea" },
    { label: "Field You Want to Apply", name: "field", type: "text" },
    { label: "Among All Others, Why Join Us?", name: "whyUs", type: "textarea" },
    { label: "Your Favorite Project and Why?", name: "favoriteProject", type: "textarea" },
    { label: "Showcase (GitHub, Demo link)", name: "showcase", type: "text" }
  ];

  return (
    <div className="products-overlay overflow-y-auto px-6 py-10">
      <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition">
        ✕
      </button>

      <div ref={formRef} className="max-w-4xl mx-auto products-content">
        <h1 className="text-center hero-heading special-font text-white text-4xl mb-12">
          Join <b>Us</b>
        </h1>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {fields.map(({ label, name, type }) => (
              <div key={name}>
                <label className="block font-circular-web text-white mb-2 text-sm">
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="products-input w-full"
                    rows={4}
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="products-input w-full"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-center mt-6 relative">
              <Button
                title={isLoading ? "" : "Submit"}
                containerClass="bg-white text-black w-full max-w-sm"
                disabled={isLoading}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                  </div>
                </div>
              )}
            </div>
          </form>
        ) : (
          <p className="text-center text-green-400 text-xl font-circular-web mt-10">
            Thank you for applying. We'll get back to you!
          </p>
        )}
      </div>
    </div>
  );
};

export default JoinTeamPage;
