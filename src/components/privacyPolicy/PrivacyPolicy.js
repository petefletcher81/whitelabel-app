import React from "react";

const PrivacyPolicy = ({ website = "test" }) => {
  return (
    <div className="container text-primary w-80 h-auto hidden scroll-y">
      <h2 className="pt-1 font-bold">Privacy Policy</h2>
      <div className="border-bottom-primary" />
      <div className="p-2">
        <p className="">
          This Privacy Policy describes how {`${website}`}
          collects, uses, and discloses your Personal Information when you visit
          the Site.
        </p>
        <div className="py-1">
          <h3>Collecting Personal Information</h3>
          <p>
            When you visit the Site, we collect certain information about your
            interaction with the Site, and information necessary to process your
            enquires. We may also collect additional information if you contact
            us for customer support.
          </p>
        </div>

        <div className="py-1">
          <h3>Other Information</h3>
          <li>
            Examples of Personal Information collected: name, email address and
            phone number.
          </li>
          <li>
            Purpose of collection: to provide your with the right information
            and best deal with your enquiry
          </li>
          <li>Source of collection: collected from you</li>
        </div>
        <div className="py-1">
          <h3>Customer Support Information</h3>
          <p>
            When you visit the Site, we collect certain information about your
            interaction with the Site, and information necessary to process your
            enquires. We may also collect additional information if you contact
            us for customer support.
          </p>
          <li>
            Examples of Personal Information collected: name, email address.
          </li>
          <li>Purpose of collection: to provide customer support.</li>
          <li>Source of collection: collected from you.</li>
        </div>
        <div className="py-1">
          <h3>Minors</h3>
          <p>
            The Site is not intended for individuals under the age of 16. We do
            not intentionally collect Personal Information from children. If you
            are the parent or guardian and believe your child has provided us
            with Personal Information, please contact us at the address below to
            request deletion
          </p>
        </div>
        <div className="py-1">
          <h3>Lawful basis</h3>
          <p>
            Pursuant to the General Data Protection Regulation (“GDPR”), if you
            are a resident of the European Economic Area (“EEA”), we process
            your personal information under the following lawful bases:
          </p>
          <li>Your consent;</li>
          <li>The performance of the contract between you and the Site;</li>
          <li>Compliance with our legal obligations;</li>
          <li>To protect your vital interests;</li>
          <li>To perform a task carried out in the public interest;</li>
          <li>
            For our legitimate interests, which do not override your fundamental
            rights and freedoms.
          </li>
        </div>

        <div className="py-1">
          <h3>Retention</h3>
          <p>
            When you place an order through the Site, we will retain your
            Personal Information for our records unless and until you ask us to
            erase this information. For more information on your right of
            erasure, please see the ‘Your rights’ section below.
          </p>
        </div>

        <div className="py-1">
          <h3>GDPR</h3>
          <p>
            If you are a resident of the EEA, you have the right to access the
            Personal Information we hold about you, and to ask that your
            Personal Information be corrected, updated, or erased. If you would
            like to exercise these rights, please contact us through email or
            simply with a call.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
