import LegalLayout from "@/components/LegalLayout";

const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction"
  },
  {
    id: "who-we-are",
    title: "2. Who We Are"
  },
  {
    id: "data-collect",
    title: "3. Data We Collect"
  },
  {
    id: "how-we-use",
    title: "4. How We Use Your Information"
  },
  {
    id: "sharing",
    title: "5. Sharing Your Information"
  },
  {
    id: "WhatsApp",
    title: "6. WhatsApp & Messaging"
  },
  {
    id: "payments",
    title: "7. Payments Processors"
  },
  {
    id: "retention",
    title: "8. Data Retention"
  },
  {
    id: "your-rights",
    title: "9. Your Rights"
  },
  {
    id: "cookies",
    title: "10. Cookies & Tracking"
  },
  {
    id: "security",
    title: "11. Security"
  },
  {
    id: "changes",
    title: "12. Changes to This Policy"
  },
  {
    id: "contact",
    title: "13. Contact Us"
  }
];

export const metadata = {
  title: "Privacy Policy - CeramiKa",
  description: "Privacy policy for CeramiKa - a brand of Impacto Trading Nigeria Ltd."
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="We take your privacy seriously. This policy explains exactly what data we collect, why we collect it, and how we protect it."
      sections={SECTIONS}
      effectiveDate="14 April 2026"
      lastUpdated="14 April 2026"
    >
      {/* 1 Introduction */}
      <h2
        id="introduction"
        className="text-2xl font-bold text-white mb-4"
      >1. Introduction</h2>
      <p className="text-white mb-6">
        This is privacy policy explains how <strong>Impacto Trading Nigeria Ltd</strong>, trading as <strong>CeramiKa</strong>, collects, uses, stores, and protects your personal information when you visit our website, communicate with us via WhatsApp or email, or place an order with us.
      </p>
      <p className="text-white mb-6">
        we are committed to handling your personal data responsibly, in with <strong>NIgeria Data Protection Act 2023 (NDPA)</strong> and <strong>the Nigeria Data Protection Regulation (NDPR).</strong> By using our website or services, you consent to the practices described in this policy
      </p>

      <div className="highlight-box">
        <p>
          <strong>Plain summary:</strong> We collect only what we need to process your order and serve you well. We do not sell your data to anyone, ever!
        </p>
      </div>

      {/* 2 Who We Are */}
      <h2
        id="who-we-are"
        className="text-2xl font-bold text-white mb-4"
      >2. Who We Are</h2>
      <p className="text-white mb-6">
        <strong>Impacto Trading Nigeria Ltd</strong> is a registered Nigerian company based in Lagos, Nigeria. We operate the brand <strong>CeramiKa</strong>, specializing in the sale of high-quality ceramic and porcelain tiles, sanitary ware, and bathroom accessories.
      </p>
      <p className="text-white mb-6">
        <strong>Our contact details:</strong>
      </p>
      <div className="info-box">
        <p>
          <strong>Impacto Trading Nigeria Limited</strong> (trading as CeramiKa) <br />
          12 Tiles Avenue, Victoria Island, Lagos, Nigeria <br />
          Email: <a href="mailto:[EMAIL_ADDRESS]">hello@ceramika.ng</a> <br />
          Phone: <a href="tel:+2348000000000">+234 800 000 0000</a>
        </p>
      </div>

      {/* 3. Data We Collect */}
      <h2
        id="data-collect"
        className="text-2xl font-bold text-white mb-4"
      >3. Data We Collect</h2>
      <h3>Information you give us directly</h3>
      <p className="text-white mb-6">
        When you place an order, contact us, or register on our platform, we may collect:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>Your full name.</li>
            <li>Phone number (including WHatsApp number.)</li>
            <li>Email address.</li>
            <li>Delivery address (street, city, state).</li>
            <li>Order details - product names, quantities, and preferences.</li>
            <li>Payment confirmation details (we do not store full card numbers - see section 7).</li>
            <li>Any messages or communication you send us via WhatsApp, email, phone, or our website.</li>
          </ul>
        </p>
      </div>
      <h3>Information collected automatically</h3>
      <p>
        When you visit our website, we may automatically collect:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>IP address, browser type, and operating system.</li>
            <li>Pages visited and time spent on each page.</li>
            <li>Date and time of your visit.</li>
            <li>Referral source (if any).</li>
            <li>Device information (device type, screen size, etc.).</li>
            <li>Cookie data (see section 10 for full details).</li>
          </ul>
        </p>
      </div>

      <h3>Information from third parties</h3>
      <p>
        We may receive limited information from payment processors (Paystack, Flutterwave) confirming that a transaction was successful. We do not receive your full card details from these providers.
      </p>

      {/* How We Use Your Data */}
      <h2
        id="how-we-use"
        className="text-2xl font-bold text-white mb-4"
      >4. How We Use Your Data</h2>
      <p className="text-white mb-6">
        We use the information we collect for the following purposes:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>
              <strong>Processing and fufilling your order</strong> - contacting you to confirm orders, coordinate delivery, and provide updates.</li>
            <li>
              <strong>Customer support</strong> - responding to your enquiries, complaints, or post-purchase questions via WhatsApp, email, or phone.</li>
            <li>
              <strong>Improving our website and services</strong> - analyzing website usage data to improve functionality and user experience.</li>
            <li>
              <strong>Payment processing</strong> - processing your payments via Paystack, Flutterwave, or other payment processors.</li>
            <li>
              <strong>Legal compliance</strong> - complying with legal and regulatory requirements.
            </li>
            <li>
              <strong>Marketing (with your consent)</strong> - sending you promotional emails or messages about new products, special offers, or company updates (only if you have opted in, you may opt out anytime).
            </li>
          </ul>
        </p>
      </div>
      <p>
        We will never use your data for purposes incompatible with those listed above without informing you and obtaining your consent where required.
      </p>

      {/* 5. Data Sharing and Disclosure */}
      <h2
        id="data-sharing"
        className="text-2xl font-bold text-white mb-4"
      >5. Data Sharing and Disclosure</h2>
      <p className="text-white mb-6">
        We do not sell, rent, or trade your personal information to third parties. We only share your data in the following limited circumstances:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>
              <strong>With your consent</strong> - when you explicitly authorize us to share your information (e.g., sharing your delivery address with our logistics partner).
            </li>
            <li>
              <strong>Service providers</strong> - we may share information with trusted third-party service providers who perform services on our behalf, such as payment processors (Paystack, Flutterwave), and delivery companies. These providers are obligated to protect your information and use it only for the purposes for which we disclose it to them.
            </li>
            <li>
              <strong>Legal requirements</strong> - we may disclose your information if required to do so by law, such as in response to a court order, subpoena, or government request.
            </li>
            <li>
              <strong>Business transfers</strong> - in the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change in ownership or control.
            </li>
          </ul>
        </p>
      </div>

      {/* 6. WhatsApp */}
      <h2
        id="whatsapp"
        className="text-2xl font-bold text-white mb-4"
      >6. WhatsApp</h2>
      <p className="text-white mb-6">
        We use WhatsApp for customer communication and order processing. When you contact us via WhatsApp, we may collect and store your phone number and message content for the purposes of fulfilling your order and providing customer support. We may also use WhatsApp Business API to send you order updates and notifications. Your WhatsApp conversations are treated with the same level of confidentiality as other forms of communication.
      </p>
      <p>
        Added to the above, we use WhatsApp to:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>
              <strong>With your consent</strong> - when you explicitly authorize us to share your information (e.g., sharing your delivery address with our logistics partner).
            </li>
            <li>
              <strong>Service providers</strong> - we may share information with trusted third-party service providers who perform services on our behalf, such as payment processors (Paystack, Flutterwave), and delivery companies. These providers are obligated to protect your information and use it only for the purposes for which we disclose it to them.
            </li>
            <li>
              <strong>Legal requirements</strong> - we may disclose your information if required to do so by law, such as in response to a court order, subpoena, or government request.
            </li>
            <li>
              <strong>Business transfers</strong> - in the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change in ownership or control.
            </li>
            <li>
              <strong>Confirm orders and send receipts</strong> - we may send you messages to confirm your orders and send you receipts.
            </li>
            <li>
              <strong>Send order updates and notifications</strong> - we may send you messages to update you on the status of your order.
            </li>
            <li>
              <strong>Send promotional messages to customers who have opted in.</strong> - we may send you messages about new products, special offers, or company updates (only if you have opted in, you may opt out anytime).
            </li>
            <li>
              <strong>Provide delivery updates and notifications</strong> - we may send you messages to update you on the status of your delivery.
            </li>
            <li>
              <strong>Answer questions and provide support</strong> - we may send you messages to answer your questions and provide support.
            </li>
            <li>
              <strong>Request feedback</strong> - we may send you messages to request feedback on your experience with our products or services.
            </li>
          </ul>
        </p>
      </div>
      <p>
        We will not add you to broadcast lists without your consent. You can opt out of receiving messages from us at any time by replying to any message with &ldquo;STOP&rdquo; or by contacting us directly.
      </p>

      {/* 7. Payments */}
      <h2
        id="payments"
        className="text-2xl font-bold text-white mb-4"
      >7. Payments</h2>
      <p className="text-white mb-6">
        We use <strong>Paystack</strong> and <strong>Flutterwave</strong> for payment processing. When you make a payment on our website, your payment information is processed securely by Paystack and Flutterwave. We do not store your payment information on our servers. For more information about how Paystack and Flutterwave handle your payment information, please refer to their respective privacy policies.
      </p>
      <p>
        For direct bank transfers, we receive only a confirmation from your bank or the payment confirmation you forward to us via WhatsApp. We do not store your bank details.
      </p>

      {/* 8. Data Retention */}
      <h2
        id="data-retention"
        className="text-2xl font-bold text-white mb-4"
      >8. Data Retention</h2>
      <p className="text-white mb-6">
        We retain your personal information only for as long as necessary to fulfill the purposes for which which are stated out in this policy:
      </p>
      <ul className="info-box">
        <li>
          <strong>Prder records</strong> - retained for a minimum of <strong>6 years</strong> {""} in line with Nigerian tax and commercial law requirements.
        </li>
        <li>
          <strong>Customer communications (WhateApp, email, phone calls)</strong> - retained for up to 2 years and then deleted unless required for an ongoing dispute resolution.
        </li>
        <li>
          <strong>Website analytics data</strong> - retained in anonymised form for up to 2 years.
        </li>
        <li>
          <strong>Marketing opt-in records</strong> - retained until you opt out, then deleted within 30 days.
        </li>
      </ul>
      <p>
        We may retain your personal information for longer periods if required by law or for legitimate business purposes, such as for tax and accounting purposes, or for the establishment, exercise, or defence of legal claims.
      </p>

      {/* 9. Your Rights */}
      <h2
        id="your-rights"
        className="text-2xl font-bold text-white mb-4"
      >9. Your Rights</h2>
      <p className="text-white mb-6">
        Under the Nigerian Data Protection Act 2023 (NDPA), you have the following rights as regards your personal data:
      </p>
      <ul className="info-box">
        <li>
          <strong>Right to Access</strong> - you have the right to request access to your personal information that we hold about you.
        </li>
        <li>
          <strong>Right to Rectification</strong> - you have the right to request correction of any inaccurate or incomplete personal information we hold about you.
        </li>
        <li>
          <strong>Right to Erasure</strong> - you have the right to request deletion of your personal information, subject to certain legal limitations.
        </li>
        <li>
          <strong>Right to Restriction</strong> - you have the right to request restriction of processing of your personal information in certain circumstances.
        </li>
        <li>
          <strong>Right to Portability</strong> - you have the right to receive your personal information in a structured, commonly used, and machine-readable format.
        </li>
        <li>
          <strong>Right to Object</strong> - you have the right to object to processing of your personal information in certain circumstances.
        </li>
        <li>
          <strong>Withdrawal of consent</strong> - you have the right to withdraw your consent to processing of your personal information at any time.
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact us using the information provided in the &ldquo;Contact Us&rdquo; section below within 30 days.
      </p>

      {/* 10. Cookies */}
      <h2
        id="cookies"
        className="text-2xl font-bold text-white mb-4"
      >10. Cookies</h2>
      <p className="text-white mb-6">
        We use cookies to improve your experience on our website. Cookies are small text files that are stored on your device when you visit our website. They allow us to recognize your device and remember your preferences.
      </p>
      <p>
        We use the following types of cookies:
      </p>
      <ul className="info-box">
        <li>
          <strong>Essential cookies</strong> - these cookies are necessary for the website to function properly.
        </li>
        <li>
          <strong>Analytical cookies</strong> - these cookies help us understand how visitors interact with our website.
        </li>
        <li>
          <strong>Marketing cookies</strong> - these cookies are used to track visitors across websites.
        </li>
      </ul>
      <p>
        You can manage your cookie preferences by adjusting your browser settings. For more information about how to manage cookies, please refer to your browser&apos;s help documentation.
      </p>

      {/* 11. Security */}
      <h2
        id="security"
        className="text-2xl font-bold text-white mb-4"
      >11. Security</h2>
      <p className="text-white mb-6">
        We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. These measures include:
      </p>
      <ul className="info-box">
        <li>
          <strong>Technical measures</strong> - we use encryption, firewalls, and other security technologies to protect your personal information.
        </li>
        <li>
          <strong>Organisational measures</strong> - we limit access to your personal information to authorized personnel only.
        </li>
        <li>
          <strong>Physical measures</strong> - we store your personal information in secure facilities.
        </li>
      </ul>
      <p>
        However, please note that no security measures are perfect, and we cannot guarantee the security of your personal information.
      </p>

      {/* 12. Changes to This Policy */}
      <h2
        id="changes-to-this-policy"
        className="text-2xl font-bold text-white mb-4"
      >12. Changes to This Policy</h2>
      <p className="text-white mb-6">
        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the &ldquo;Last Updated&rdquo; date at the top of the policy.
      </p>

      {/* 13. Contact Us */}
      <h2
        id="contact-us"
        className="text-2xl font-bold text-white mb-4"
      >13. Contact Us</h2>
      <p className="text-white mb-6">
        If you have any questions or concerns about this Privacy Policy or our data protection practices, please contact us at:
      </p>
      <ul className="info-box">
        <li>
          <strong>Email:</strong> [EMAIL_ADDRESS]
        </li>
        <li>
          <strong>Phone:</strong> +234 800 000 0000
        </li>
        <li>
          <strong>WhatsApp:</strong> <a href="https://wa.me/2348100000000">wa.me/2348100000000</a>
        </li>
        <li>
          <strong>Address:</strong> 123 Main Street, Lagos, Nigeria
        </li>
      </ul>
    </LegalLayout>
  )
}
