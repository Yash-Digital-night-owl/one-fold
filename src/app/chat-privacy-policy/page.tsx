"use client";

import Layout from "@/components/Layout";
import { MessageCircle } from "lucide-react";
import React from "react";

export default function ChatPrivacyPolicyPage() {
  return (
    <Layout>
      <div className="p-4 lg:p-8 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl border border-gray-800">
            <MessageCircle className="w-7 h-7 text-orange-400" />
          </div>

          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Chat Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm">
              OneFold Dating App – Last Updated: February 20, 2026
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 rounded-2xl shadow-xl p-6 lg:p-10 space-y-8">

          <Section title="1. Introduction">
            This Chat Privacy Policy explains how <strong>OneFold</strong> protects,
            stores, and manages private conversations on our platform.
            We are committed to maintaining a secure, respectful, and
            privacy-focused communication environment for all users.
          </Section>

          <Section title="2. Information We Collect in Chats">

            <SubSection title="2.1 Chat Content">
              • Messages sent and received <br />
              • Images, videos, and files shared <br />
              • Voice notes (if enabled)
            </SubSection>

            <SubSection title="2.2 Chat Metadata">
              • Message timestamps <br />
              • Delivery and read status <br />
              • User IDs involved in conversations <br />
              • Device and connection logs (for security)
            </SubSection>

          </Section>

          <Section title="3. Purpose of Chat Data Processing">
            We process chat data only to:
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Deliver messaging services</li>
              <li>Enable real-time communication</li>
              <li>Maintain platform safety</li>
              <li>Prevent fraud, abuse, and scams</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3 font-medium">
              We do NOT use private chat content for advertising, profiling,
              or selling to third parties.
            </p>
          </Section>

          <Section title="4. Message Security & Encryption">
            OneFold uses industry-standard security measures including:
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Secure cloud infrastructure</li>
              <li>Restricted internal access controls</li>
              <li>Regular security audits</li>
            </ul>
            We do not sell, rent, or misuse private conversations.
          </Section>

          <Section title="5. Moderation & Safety Monitoring">
            <ul className="list-disc pl-6 space-y-1">
              <li>Users can report and block other users.</li>
              <li>Reported conversations may be reviewed by our moderation team.</li>
              <li>We may use automated systems to detect harmful or illegal content.</li>
              <li>Accounts violating policies may be restricted or permanently removed.</li>
            </ul>
            Moderation is conducted responsibly and solely to ensure user safety.
          </Section>

          <Section title="6. Information Sharing">
            <SubSection title="We May Share Chat Data">
              • When legally required by law enforcement <br />
              • For fraud investigation <br />
              • With trusted service providers under strict confidentiality
            </SubSection>

            <SubSection title="We Never Share">
              • Private messages for advertising <br />
              • Conversations for commercial sale <br />
              • Chat content with unauthorized third parties
            </SubSection>
          </Section>

          <Section title="7. User Control Over Conversations">
            Users have full control to:
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Delete messages (where applicable)</li>
              <li>Block users</li>
              <li>Report abuse or inappropriate behavior</li>
              <li>Delete their entire account</li>
            </ul>
          </Section>

          <Section title="8. Data Retention">
            <ul className="list-disc pl-6 space-y-1">
              <li>Chat data is stored while the account remains active.</li>
              <li>Deleted messages are removed from active systems.</li>
              <li>Account deletion removes chat data within 30 days unless legally required.</li>
            </ul>
          </Section>

          <Section title="9. 18+ Only & Child Protection">
            OneFold is strictly for users aged 18 and above.
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>We do not knowingly collect chat data from minors.</li>
              <li>Accounts found violating age policies are immediately removed.</li>
              <li>We actively enforce child safety standards.</li>
            </ul>
          </Section>

          <Section title="10. Legal Compliance">
            Our messaging system complies with applicable data protection
            regulations including GDPR, CCPA, and other privacy laws.
            We follow recognized security and data governance standards.
          </Section>

          <Section title="11. Updates to This Policy">
            This Chat Privacy Policy may be updated periodically.
            Users will be notified of significant changes through
            in-app notifications or email communication.
          </Section>

          <Section title="12. Contact Us">
            <div className="space-y-1 text-gray-300">
              <p>Support Email: support@onefold.in</p>
              <p>Privacy Email: privacy@onefold.in</p>
              <p>Website: www.onefold.in</p>
            </div>
          </Section>

          <Section title="13. Safety Guidelines">
            <div className="space-y-2 text-gray-300">
              <p>• Never share passwords or OTPs</p>
              <p>• Avoid sharing financial details</p>
              <p>• Report suspicious or abusive users</p>
              <p>• Use block and report tools for protection</p>
            </div>
          </Section>

          <div className="pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              © 2026 OneFold Technologies. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}

/* Reusable Components */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg lg:text-xl font-semibold text-white border-l-4 border-orange-500 pl-3">
        {title}
      </h2>
      <div className="text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pl-4 border-l border-gray-700 space-y-1">
      <h3 className="text-white font-medium">{title}</h3>
      <div className="text-gray-400 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}