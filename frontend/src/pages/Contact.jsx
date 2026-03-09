import { useForm } from "react-hook-form";
import Button from "../components/Button";
import "./Contact.css";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form:", data);
    alert("Thank you! We'll get back to you soon.");
    reset();
  };

  return (
    <section className="contact-page">
      <div className="page-shell">
        <div className="contact-header">
          <span className="contact-kicker">Let’s talk travel</span>
          <h1>Contact Us</h1>
          <p>Have a question about a destination, booking, or custom trip?</p>
        </div>

        <div className="contact-card">
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="contact-row">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                className="contact-input"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="contact-error">{errors.name.message}</p>}
            </div>

            <div className="contact-row">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="contact-input"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="contact-error">{errors.email.message}</p>}
            </div>

            <div className="contact-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="contact-textarea"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="contact-error">{errors.message.message}</p>}
            </div>

            <div className="contact-submit">
              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}