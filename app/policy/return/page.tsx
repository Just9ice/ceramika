import LegalLayout from "@/components/LegalLayout";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
  },
  {
    id: "eligibility",
    title: "2. Return Eligibility",
  },
  {
    id: "not-eligible",
    title: "3. Non-Returnable Items",
  },
  {
    id: "process",
    title: "4. How to Request a Return",
  },
  {
    id: "approval",
    title: "5. Management Approval",
  },
  {
    id: "logistics",
    title: "6. Return Logistics & Cost"
  },
  {
    id: "condition",
    title: "7. Condition Requirments",
  },
  {
    id: "refunds",
    title: "8. Refunds",
  },
  {
    id: "damaged",
    title: "9. Damaged on Arrival",
  },
  {
    id: "exchanges",
    title: "10. Exchanges",
  },
  {
    id: "contact",
    title: "11. Contact Us"
  },
];

export const metadata = {
  title: "Returns Policy",
  description: "Return Policy for CeramiKa - a brand of Impacto Trading Nigeria Ltd."
};

export default function ReturnPolicy() {
  return (
    <LegalLayout
      title="Returns Policy"
      subtitle="We want you to completely satisfied with your titles. If something isn't right, here is how we handle returns."
      effectiveDate="14 April 2026"
      lastUpdated="14 April 2026"
      sections={SECTIONS}
    >
      {/* Overview */}
      <h2
        id="overview"
        className="text-2xl font-bold text-white mb-4"
      >1. Overview</h2>
      <p className="text-white mb-6">
        CeramiKa, a brand of <strong>Impacto Trading Nigeria Limited</strong> operates a management-approved returns process. Returns are not automatic - every return request is reviewed and must be approved by our management team before goods are sent back to us.
      </p>
      <p className="text-white mb-6">
        This policy exists to protect both our customers and the integrity of our stock. Tiles are heavy, fragile goods that require careful handling during return transit. We assess every request fairly and respond promptly.
      </p>

      <div className="highlight-box">
        <p className="text-white mb-6">
          <strong>Key points at a glance:</strong> Returns require prior management approval · Goods must be in original, undamaged condition · Customer is responsible for return logistics costs · Refunds are issued after inspection.
        </p>
      </div>

      {/* 2. Return Eligibility */}
      <h2
        id="eligibility"
        className="text-2xl font-bold text-white mb-4"
      >2. Return Eligibility</h2>
      <p className="text-white mb-6">
        A return may be considered under the following circumstances:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>
              <strong>Wrong item delivered</strong> - we dispatched a different tile than what was confirmed in your Order Confirmation.
            </li>
            <li>
              <strong>Significant quality defect</strong> - title arrive with a manufacturing defect that was not visible at the time of inspection prior to dispatch and that materially affects their appearance or structural integrity
            </li>
            <li>
              <strong>Change of mind (unopened stock only)</strong> - subject to management approval, unopened cartons in original factory packaging may be considered for return. This is our sole discretion.
            </li>
          </ul>
        </p>
      </div>
      <p className="text-white mb-6">
        All return requests - regardless of reason - must be submitted within <strong>48 hours of delivery</strong> for damaged or incorrect goods, and within <strong>14 calendar days of delivery</strong> for change of mind returns.
      </p>

      {/* Not eligible */}
      <h2
        id="not-eligible"
        className="text-2xl font-bold text-white mb-4"
      >3. Non-Returnable Items</h2>
      <p className="text-white mb-6">
        The following items are <strong>not eligible</strong> for return under any circumstances:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>
              <strong>Cut tiles</strong> - any tile that has been cut, trimmed, or modified from its original size.
            </li>
            <li>
              <strong>Opened cartons</strong> - cartons that have been opened, individual tiles have been removed and mixed with other batches, or packaging is damaged.
            </li>
            <li>
              <strong>Discontinued items</strong> - items that are no longer in our regular stock.
            </li>
            <li>
              <strong>Clearance items</strong> - items sold as clearance or final sale.
            </li>
            <li>
              <strong>Installed tiles</strong> - tiles that have been installed or used in any way.
            </li>
            <li>
              <strong>Special Orders</strong> - tiles ordered as custom or special-order batch outside our standard range.
            </li>
            <li>
              <strong>Tiles with damaged packaging</strong> - cartons that have been opened, individual tiles have been removed and mixed with other batches, or packaging is damaged.
            </li>
            <li>
              <strong>Exceeded time frame</strong> - returns submitted outside the 48-hour or 14-day window.
            </li>
          </ul>
        </p>
      </div>

      {/* Process */}
      <h2
        id="process"
        className="text-2xl font-bold text-white mb-4"
      >4. How to Request a Return</h2>
      <p className="text-white mb-6">
        To request a return, please follow these steps:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>
              <strong>Contact us within the required timeframe</strong> - 48 hours for damaged or incorrect goods, 14 days for change of mind.
            </li>
            <li>
              <strong>Provide your order number</strong> - this can be found in your Order Confirmation email.
            </li>
            <li>
              <strong>Describe the reason for return</strong> - be specific about the issue.
            </li>
            <li>
              <strong>Send photos of the tiles</strong> - clear photos showing the issue.
            </li>
            <li>
              <strong>State your preference</strong> - refund, exchange, or store credit.
            </li>
          </ul>
        </p>
      </div>
      <p>
        Additionally, contact us via WhatsApp or email with the
        following information:
      </p>
      <div className="info-box">
        <ol>
          <li>Your full name and order number (or the date and amount of your order).</li>
          <li>The name of the tile(s) you wish to return.</li>
          <li>The quantity in square metres and number of cartons.</li>
          <li>
            The reason for the return — please be specific (e.g. &ldquo;wrong tile
            delivered&rdquo;, &ldquo;crack visible on 3 tiles in carton 2&rdquo;).
          </li>
          <li>
            <strong>Clear photographs</strong> of the tiles and their packaging,
            including any damage or defects. Photos are mandatory for all
            quality-related return requests.
          </li>
        </ol>
      </div>
      <p>
        Without photographs, we may be unable to process quality-related claims.
        Send your request to:
      </p>
      <div className="info-box">
        <p>
          WhatsApp: <a href="https://wa.me/2348100000000">wa.me/2348100000000</a>
          <br />
          Email: <a href="mailto:hello@ceramika.ng">hello@ceramika.ng</a>
        </p>
      </div>

      {/* Approval */}
      <h2
        id="approval"
        className="text-2xl font-bold text-white mb-4"
      >5. Management Approval</h2>
      <p className="text-white mb-6">
        All return requests are subject to management approval. We reserve the right to refuse any return that does not meet our policy requirements. This means:
      </p>
      <div className="info-box">
        <p>
          <ul>
            <li>
              <strong>WhatsApp or Written Approval</strong> - we will not accept any return without prior WhatsApp or written approval.
            </li>
            <li>
              <strong>None Acceptance of Unapproved Returns</strong> - we will not accept any return that is not approved by management.
            </li>
            <li>
              <strong>Change of mind (unopened stock only)</strong> - subject to management approval, unopened cartons in original factory packaging may be considered for return. This is our sole discretion.
            </li>
            <li>
              We aim to review and respond to all return requests promptly upon receiving your request with all required information and photographs.
            </li>
          </ul>
        </p>
      </div>
      <p>
        If your request is approved, we will provide you with our return address and any specific packaging instructions.
      </p>
      <p>
        If your request is declined, we will explain our decision in writing and, where possible, suggest an alternative resolution.
      </p>

      {/* Logistics */}
      <h2
        id="logistics"
      >
        6. Return Logistics & Cost
      </h2>
      <p>
        the <strong>customer is responsible for all costs</strong> associated with returning goods to us, including:
      </p>
      <div className="info-box">
        <ul>
          <li>Transportation and courier fees.</li>
          <li>Packaging materials required to safely re-pack the tiles.</li>
          <li>Any insurance on the return shipment.</li>
        </ul>
      </div>
      <p>
        Tiles are heavy and fragile. We strongly recommend using a reputable courier with experience handling building materials, and that you photograph the goods before re-packing to document their condition at the time of dispatch.
      </p>
      <p>
        We are not responsible for goods damaged in transit during a return shipment. If goods arrive at our warehouse in a worse condition than at the time of approval, we reserve the right to reduce or decline the refund.
      </p>
      <p>
        <strong>Exception:</strong> where we have confirmed that we dispatched the wrong item, we will arrange and cover the cost of collection.
      </p>

      {/* Condition */}
      <h2
        id="condition"
      >
        7. Condition Requirements
      </h2>
      <p>
        For a return to be accepted on arrival at our warehouse, the goods must meet all of the following conditions - the same conditions as they were in at the time of dispatch:
      </p>
      <div className="info-box">
        <ul>
          <li>All tiles must be intact - no cracks, chips, or breakages.</li>
          <li>Tiles must be in their original factory cartons and packaging.</li>
          <li>Original carton and packaging labelling must be present and legible.</li>
          <li>
            No tiles removed from the cartons and replaced (mixed batches)
          </li>
          <li>
            No mortar, adhesive, grout, or other substances on any tile surface.
          </li>
          <li>
            No signs of on-site use, installation attempts, or cutting marks.
          </li>
        </ul>
      </div>
      <p>
        Upon receipt, our warehouse team will inspect all returned goods. If the goods do not meet these conditions, we reserve the right to refuse the return and resend the goods to you at your expense, or to apply a restocking fee of up to 20% of the order value.
      </p>

      {/* Refunds */}
      <h2
        id="refunds"
      >
        8. Refunds
      </h2>
      <p>
        Once returned goods have been received and inspected and the return is confirmed as approved:
      </p>
      <div className="info-box">
        <ul>
            Refunds will be issued after inspection sign-off.
          <li>
            Refunds are issued through <strong>same payment method</strong> used for the original purchase (bank transfer, Paystack, or Flutterwave).
          </li>
          <li>
            Original delivery fees are <strong>non-refundable</strong> unless the return is due to our error (wrong item dispatched).
          </li>
          <li>
            Partial refunds may be issued where only part of an order is returned or where returned goods do not fully meet our condition requirements.
          </li>
        </ul>
      </div>

      {/* Damaged */}
      <h2
        id="damaged"
      >
        9. Damaged Goods on Arrival
      </h2>
      <p>
        If your tiles arrive visibly damaged, please follow these steps immediately:
      </p>
      <div className="info-box">
        <ol>
          <li>
            <strong>Do not discard any packaging.</strong> Packaging evidence is required to access transit damage.
          </li>
          <li>
            Photograph the outer packaging (before opening), the open carton, and the damaged tiles clearly.
          </li>
          <li>
            Contact us via WhatsApp within <strong>48 hours of delivery</strong> with photos and your order details.
          </li>
          <li>
            Do not dispose of the damaged tiles or packaging until we have advised you on the next steps.
          </li>
        </ol>
      </div>
      <p>
        Claims submitted more than 48 hours after delivery will not be considered as transit damage and will be assessed under the standard returns process instead. We will work with you and our logistics partners to resolve legitimate transit damage claims as quickly as possible.
      </p>

      {/* Exchanges */}
      <h2
        id="exchanges"
      >
        10. Exchanges
      </h2>
      <p>
        We do not operate a direct exchange programme. If you wish to exchange a product, you will need to:
      </p>
      <div className="info-box">
        <ul>
          <li>
            Submit a return request following the process in Section 4.
          </li>
          <li>
            Once your return request is approved and processed, place a new order for the desired item.
          </li>
        </ul>
      </div>
      <p>
        We are happy to advise you alternative products via WhatsApp or phone call before you place your new order
      </p>

      {/* ── Contact ── */}
      <h2 id="contact">11. Contact Us</h2>
      <p>
        To initiate a return or ask any questions about this policy, please contact us:
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

      {/* WHatsApp CTA */}
      <div
        className="highlight-box"
        style={{
          marginTop: "2rem",
          textAlign: "center"
        }}
      >
        <WhatsAppIcon className="w-8 h-8 text-[#25d366]" />
        <a
          href="https://wa.me/2348100000000?text=Hello%20CeramiKa%21%20I%20need%20help%20with%20a%20return."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#25d366",
            color: "white",
            fontWeight: "700",
            fontSize: "0.875rem",
            padding: "12px 24px",
            borderRadius: "9999px",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          className="whatsapp-button hover:opacity-90"
        >
          Start a Return Request on WhatsApp
        </a>
      </div>

    </LegalLayout>
  )
}