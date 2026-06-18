import LegalLayout from "@/components/LegalLayout"

const SECTIONS = [
  {
    id: "introdcution",
    title: "1. Introduction"
  },
  {
    id: "definitions",
    title: "2. Definitions"
  },
  {
    id: "use-of-site",
    title: "3. Use of Website"
  },
  {
    id: "orders",
    title: "4. Orders & Contracts"
  },
  {
    id: "[pricing",
    title: "5. Pricing & Payment"
  },
  {
    id: "delivery",
    title: "6. Delivery"
  },
  {
    id: "products",
    title: "7. Products"
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property"
  },
  {
    id: "limitations-of-liability",
    title: "9. Liability"
  },
  {
    id: "governing-law",
    title: "10. Governing Law"
  },
  {
    id: "changes",
    title: "11. Changes to Terms"
  },
  {
    id: "contact",
    title: "12. Contact Us"
  }
];

export const metadata = {
  title: "Terms & Conditions - CeramiKa",
  description: "Terms & Conditions for CeramiKa - a brand of Impacto Trading Nigeria Limited"
}

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="Welcome to CeramiKa, a brand of Impacto Trading Nigeria Limited. These Terms & Conditions govern your use of our website, products, and services. Please read these terms carefully before placing an order or using our website"
      effectiveDate="14 April 2026"
      lastUpdated="14 April 2026"
      sections={SECTIONS}
    >
      {/* Introduction */}
      <h2
        id="introduction"
      >
        1. Introduction
      </h2>
      <p className="text-white mb-5">
        welcome to <strong>Ceramika</strong>, a brand and trading name of {" "} <strong>Impacto Trading Nigeria Limited</strong>, a company duly incorporated under the laws of the Federal Republic of Nigeria (CAC-registered). Our registered office is at 12 Tiles Avenue, Victoria Island, Lagos, Nigeria.
      </p>
      <p className="text-white mb-5">
        These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of our website at <a href="https://ceramika.ng">ceramika.ng</a>, our WhatsApp ordering channel, and any purchase you make from us. By browsing our website, placing an order, or communicating with us via WhatsApp for any purpose of purchasing goods, you agree to be bound by these Terms.
      </p>
      <p className="text-white mb-5">
        These Terms & Conditions apply to all sales made by CeramiKa to customers, whether through our website, in person at our showroom, or via phone/email orders. By placing an order, you agree to be bound by these terms.
      </p>
      <p className="text-white mb-5">
        If you do not agree with any part of these Terms, you must not use our website or place an order.
      </p>
      <div className="highlight-box">
        <p>
          <strong>Plain summary:</strong> By buying from CeramiKa, you are entering into a contract with Impacto Trading Nigeria Limited. These Terms explain your rights and ours, how orders work, and what happens if something goes wrong.
        </p>
      </div>

      {/* 2. Definitions */}
      <h2
        id="definitions"
      >2. Definitions</h2>
      <p>
        In these Terms, the following words have specific meanings:
      </p>
      <div className="info-box">
        <ul>
          <li>
            <strong>&ldquo;We&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;</strong> — Impacto Trading Nigeria Limited,
            trading as CeramiKa.
          </li>
          <li>
            <strong>&ldquo;You&rdquo;, &ldquo;your&rdquo;, &ldquo;customer&rdquo;</strong> — the individual or entity
            placing an order or using our website.
          </li>
          <li>
            <strong>&ldquo;Goods&rdquo;</strong> — tiles and related finishing materials listed for
            sale on our website or communicated via WhatsApp.
          </li>
          <li>
            <strong>&ldquo;Order&rdquo;</strong> — a request by you to purchase Goods from us,
            submitted via website, WhatsApp, email, or telephone.
          </li>
          <li>
            <strong>&ldquo;Order Confirmation&rdquo;</strong> — written or WhatsApp confirmation
            issued by us acknowledging that your Order has been accepted and payment
            received or arranged.
          </li>
          <li>
            <strong>&ldquo;Website&rdquo;</strong> — ceramika.ng and all associated subdomains.
          </li>
        </ul>
      </div>

      {/* ── 3. Use of Site ── */}
      <h2
        id="use-of-site"
      >
        3. Use of Website
      </h2>
      <h3>Eligibility</h3>
      <p>
        You must be at least 18 years of age to place an order. By using this website, you confirm that you meet this requirement.
      </p>
      <h3>Permitted use</h3>
      <p>
        You may use our website for lawful personal and commercial purposes only. You must not use our website in any way that causes, or may cause, damage to the website or impairment of its availability or accessibility.
      </p>
      <h3>
        Prohibited activities
      </h3>
      <div className="info-box">
        <ul>
          <li>Scraping, copying, or reporducing our product data or images without permission.</li>
          <li>
            Submitting false or fraudlent orders.
          </li>
          <li>
            Using automated systems to interact with our platforms without our written consent.
          </li>
          <li>
            Any activity that voilates applicable Nigerian law, including the Cybercrimes (prohibition, Prevention, etc.) Act, 2015.
          </li>
        </ul>
      </div>
      {/* ── 4. Orders & Contracts ── */}
      <h2 id="orders">4. Orders & Contracts</h2>
      <h3>How orders are placed</h3>
      <p>
        Orders may be placed through our website cart, directly via WhatsApp, by
        telephone, or by email. All orders are subject to acceptance by us and
        availability of stock.
      </p>
      <h3>Order acceptance</h3>
      <p>
        A contract between you and Impacto Trading Nigeria Limited is only formed
        when we send you an Order Confirmation — whether via WhatsApp message, email,
        or written receipt — and payment has been received or a verifiable payment
        arrangement has been agreed.
      </p>
      <p>
        We reserve the right to decline any order at our discretion, including where
        goods are out of stock, where pricing errors have occurred, or where we are
        unable to verify payment.
      </p>
      <h3>Order accuracy</h3>
      <p>
        It is your responsibility to ensure that all order details — including tile
        name, quantity in square metres (sqm), delivery address, and contact number
        — are correct before confirming your order. We are not liable for losses
        arising from inaccurate information provided by you.
      </p>
      <h3>Cancellations by you</h3>
      <p>
        Orders may be cancelled without penalty within <strong>24 hours</strong> of
        placing, provided the goods have not yet been dispatched. After dispatch,
        cancellation is not possible and our Returns Policy will apply.
      </p>
      <h3>Cancellations by us</h3>
      <p>
        We reserve the right to cancel an accepted order if goods become unavailable
        after acceptance. In such cases, a full refund will be issued within 5
        business days.
      </p>

      {/* ── 5. Pricing & Payment ── */}
      <h2 id="pricing">5. Pricing & Payment</h2>
      <h3>Prices</h3>
      <p>
        All prices displayed on our website and communicated via WhatsApp are
        denominated in <strong>Nigerian Naira (₦)</strong> and are inclusive of
        applicable Value Added Tax (VAT) unless stated otherwise. Delivery fees are
        not included in tile prices and are quoted separately at the time of order.
      </p>
      <p>
        We make every effort to ensure pricing accuracy. However, if a pricing error
        is identified before dispatch, we will contact you to confirm the correct
        price or cancel the order with a full refund.
      </p>
      <h3>Payment methods</h3>
      <p>We accept the following payment methods:</p>
      <ul>
        <li>Direct bank transfer to our designated account.</li>
        <li>Card payment via Paystack.</li>
        <li>Card or bank payment via Flutterwave.</li>
        <li>Cash on delivery for select Lagos locations (subject to prior agreement).</li>
      </ul>
      <h3>Payment timing</h3>
      <p>
        Full payment is required before goods are dispatched unless a credit
        arrangement has been agreed in writing with our management. We do not
        dispatch goods on the basis of pending bank transfers unless payment has
        been confirmed by our bank.
      </p>

      {/* ── 6. Delivery ── */}
      <h2 id="delivery">6. Delivery</h2>
      <h3>Delivery areas</h3>
      <p>
        We deliver to all 36 states of Nigeria and the Federal Capital Territory.
        Delivery fees and timelines vary by location and will be communicated at
        the time of order confirmation.
      </p>
      <h3>Estimated delivery times</h3>
      <ul>
        <li><strong>Lagos, Abuja, and all other states:</strong> Delivery timelines depend on your location.</li>
        <li><strong>Showroom pickup (Victoria Island, Lagos):</strong> Same day, subject to stock availability.</li>
      </ul>
      <p>
        Delivery timelines are estimates only and are not guaranteed. We are not
        liable for delays caused by logistics partners, traffic, weather, or other
        factors outside our control.
      </p>
      <h3>Risk of loss</h3>
      <p>
        Risk in the goods passes to you upon delivery to your specified address or
        upon collection from our showroom. Title to the goods passes to you upon
        full payment.
      </p>
      <h3>Failed deliveries</h3>
      <p>
        If delivery is unsuccessful due to your absence or incorrect address, a
        re-delivery fee may be charged. It is your responsibility to ensure someone
        is available to receive the goods at the agreed delivery address.
      </p>

      {/* ── 7. Products ── */}
      <h2 id="products">7. Products</h2>
      <h3>Colour and texture variation</h3>
      <p>
        Tile colours and textures shown on our website are as accurate as our
        photography and screen reproduction allow. However, natural materials such
        as marble and granite will have inherent variation between individual pieces,
        and colour perception may differ depending on your screen settings and
        ambient lighting. We strongly recommend visiting our showroom or requesting
        a physical sample before placing large orders.
      </p>
      <h3>Quantity and wastage</h3>
      <p>
        We recommend adding a <strong>10% wastage buffer</strong> to your calculated
        square metre requirement to account for cutting, breakage during installation,
        and future repairs. Our SQM Calculator includes this buffer automatically.
        We are not responsible for shortfall in quantities ordered without wastage
        allowance.
      </p>
      <h3>Out-of-stock items</h3>
      <p>
        Stock availability is subject to change. If a product becomes unavailable
        after your order has been confirmed, we will contact you promptly to offer
        an alternative or issue a full refund.
      </p>

      {/* ── 8. Intellectual Property ── */}
      <h2 id="ip">8. Intellectual Property</h2>
      <p>
        All content on this website — including but not limited to text, images,
        product descriptions, logos, the CeramiKa brand name, and the overall
        website design — is owned by or licensed to Impacto Trading Nigeria Limited.
        You may not reproduce, distribute, or use any such content without our prior
        written consent.
      </p>

      {/* ── 9. Liability ── */}
      <h2 id="liability">9. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by Nigerian law, Impacto Trading Nigeria
        Limited shall not be liable for:
      </p>
      <ul>
        <li>Any indirect, incidental, or consequential losses arising from your use of our website or our goods.</li>
        <li>Any loss arising from your reliance on information published on our website that has since changed.</li>
        <li>Damage caused by improper installation, maintenance, or misuse of tiles after delivery.</li>
        <li>Losses arising from third-party logistics failures outside our control.</li>
      </ul>
      <p>
        Our total liability to you in respect of any order shall not exceed the
        value of that order. Nothing in these Terms limits liability for fraud,
        death, or personal injury caused by our negligence.
      </p>

      {/* ── 10. Governing Law ── */}
      <h2 id="governing-law">10. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws
        of the Federal Republic of Nigeria. Any disputes arising from these Terms
        or your use of our services shall be subject to the exclusive jurisdiction
        of the courts of Lagos State, Nigeria.
      </p>
      <p>
        We will always attempt to resolve disputes amicably in the first instance.
        Please contact us via WhatsApp or email before initiating any formal
        proceedings.
      </p>

      {/* ── 11. Changes ── */}
      <h2 id="changes">11. Changes to These Terms</h2>
      <p>
        We reserve the right to update or modify these Terms at any time. The
        &ldquo;Last updated&rdquo; date at the top of this page will reflect any changes.
        Continued use of our website or placement of orders after changes are
        published constitutes your acceptance of the updated Terms.
      </p>

      {/* ── 12. Contact ── */}
      <h2 id="contact">12. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us:
      </p>
      <div className="info-box">
        <p>
          <strong>Impacto Trading Nigeria Limited</strong> (trading as CeramiKa)<br />
          12 Tiles Avenue, Victoria Island, Lagos, Nigeria<br />
          Email: <a href="mailto:hello@ceramika.ng">hello@ceramika.ng</a><br />
          Phone: <a href="tel:+2348100000000">+234 810 000 0000</a><br />
          WhatsApp: <a href="https://wa.me/2348100000000">wa.me/2348100000000</a>
        </p>
      </div>
    </LegalLayout>
  );
}