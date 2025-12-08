import React from "react";
import Container from "../../components/shared/Container/Container";
import { FaHandshake, FaGlobe, FaUsers, FaAward } from "react-icons/fa";

const AboutUs = () => {
  return (
    <Container>
      <div className="py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl  font-bold mb-6 text-primary">
            About LoanZone
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            We are on a mission to democratize finance. LoanZone connects
            borrowers with the right financial solutions through technology,
            transparency, and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
              alt="Team meeting"
              className="rounded-2xl shadow-2xl w-full object-cover h-[400px]"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <div className="card bg-base-100 shadow-lg border-l-4 border-primary">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-2">
                  <FaHandshake className="text-primary" /> Our Mission
                </h3>
                <p>
                  To empower individuals and businesses by providing fast, fair,
                  and transparent access to capital, enabling them to achieve
                  their financial goals.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg border-l-4 border-primary">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-2">
                  <FaGlobe className="text-primary" /> Our Vision
                </h3>
                <p>
                  To build a world where financial opportunities are accessible
                  to everyone, regardless of their background or location.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base-200 rounded-3xl p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm uppercase tracking-wide opacity-70">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
              <div className="text-sm uppercase tracking-wide opacity-70">
                Loans Funded
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <div className="text-sm uppercase tracking-wide opacity-70">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm uppercase tracking-wide opacity-70">
                Support
              </div>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:bg-base-200 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer First</h3>
              <p className="text-base-content/70">
                We place our customers at the heart of everything we do,
                ensuring their needs are met with empathy and respect.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-base-200 transition-colors">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-3xl text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-base-content/70">
                We operate with honesty and transparency, building lasting
                relationships based on trust.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-base-200 transition-colors">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-base-content/70">
                We continuously evolve our technology and processes to deliver
                the best possible financial experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
