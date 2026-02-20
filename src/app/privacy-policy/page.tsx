"use client";

import React from "react";
import Layout from "@/components/Layout";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="p-4 lg:p-8 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            OneFold Dating App – Last Updated: February 20, 2026
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 rounded-2xl shadow-xl p-6 lg:p-10 space-y-8">

          <Section title="1. Introduction">
            <p>
              Welcome to <strong>OneFold</strong> ("App", "we", "our", "us").
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>App Name:</strong> OneFold</li>
              <li><strong>Company Name:</strong> OneFold Technologies</li>
              <li><strong>Website:</strong> https://www.onefold.in</li>
              <li><strong>Support Email:</strong> support@onefold.in</li>
              <li><strong>Privacy Email:</strong> privacy@onefold.in</li>
            </ul>
            <p className="mt-3">
              We are committed to protecting your privacy and handling your data
              transparently and responsibly. By using OneFold, you agree to this policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">

            <SubSection title="2.1 Information You Provide">
              <ul className="list-disc pl-6 space-y-1">
                <li>Name / Username</li>
                <li>Age</li>
                <li>Gender</li>
                <li>Profile photos</li>
                <li>Interests / preferences</li>
                <li>Location (if enabled)</li>
                <li>Chat messages</li>
                <li>Information during profile creation</li>
                <li>Government-issued ID (for age verification, if required)</li>
              </ul>
              <p className="mt-2">
                Users upload photos and messages at their own responsibility.
              </p>
            </SubSection>

            <SubSection title="2.2 Information Collected Automatically">
              <ul className="list-disc pl-6 space-y-1">
                <li>Device information</li>
                <li>IP address</li>
                <li>App usage data</li>
                <li>Log data</li>
                <li>Approximate location (if permitted)</li>
              </ul>
            </SubSection>

          </Section>

          <Section title="3. Age Verification & Government ID">
            <p>
              OneFold is strictly for users aged 18 and above.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                We may request a government-issued ID to verify that a user is above 18 years of age.
              </li>
              <li>
                Government ID is used solely for age verification and fraud prevention.
              </li>
              <li>
                ID information is securely processed and not publicly displayed.
              </li>
              <li>
                Accounts failing age verification will be permanently removed.
              </li>
            </ul>
          </Section>

          <Section title="4. How We Use Your Information">
            <ul className="list-disc pl-6 space-y-1">
              <li>Create and manage your profile</li>
              <li>Enable matching users</li>
              <li>Provide chat functionality</li>
              <li>Improve app features and performance</li>
              <li>Safety & fraud prevention</li>
              <li>Verify user age and identity</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">We do not sell your personal data.</p>
          </Section>

          <Section title="5. User Content & Responsibility">
            <ul className="list-disc pl-6 space-y-1">
              <li>We do not endorse user-generated content.</li>
              <li>Content may be reviewed for safety purposes.</li>
              <li>Users can report and block other users.</li>
              <li>Reported content is reviewed by our moderation team.</li>
              <li>Accounts violating policies may be suspended or removed.</li>
            </ul>
          </Section>

          <Section title="6. Safety & Fraud Prevention">
            <p>
              We use automated systems and manual moderation to detect fake
              profiles, prevent fraud, remove inappropriate content, and
              maintain a safe community.
            </p>
          </Section>

          <Section title="7. Data Storage & Retention">
            <ul className="list-disc pl-6 space-y-1">
              <li>Data stored while your account is active.</li>
              <li>Users can delete their account at any time.</li>
              <li>Data permanently deleted within 30 days of account deletion request.</li>
              <li>Government ID data (if collected) is securely deleted after verification or as legally required.</li>
            </ul>
          </Section>

          <Section title="8. Children’s Privacy (Strict 18+ Policy)">
            <ul className="list-disc pl-6 space-y-1">
              <li>We do not knowingly collect data from children.</li>
              <li>Accounts violating age requirements are removed immediately.</li>
              <li>If we discover underage usage, the account is permanently deleted.</li>
            </ul>
          </Section>

          <Section title="9. Your Privacy Rights">
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your data</li>
              <li>Update or delete your data</li>
              <li>Request a copy of your data</li>
              <li>Contact support for privacy requests</li>
            </ul>
          </Section>

          <Section title="10. Data Security">
            <p>
              We use encryption, secure servers, restricted access controls,
              and regular monitoring to protect your data. However, no system
              can guarantee 100% security.
            </p>
          </Section>

          <Section title="11. Account Deletion">
            <p>
              You may delete your account through in-app settings or by emailing
              support@onefold.in. All associated data will be removed within 30 days.
            </p>
          </Section>

          <Section title="12. Policy Updates">
            <p>
              This policy may be updated periodically. Users will be notified of
              significant changes via email or in-app notification.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <div className="space-y-1">
              <p>Email: support@onefold.in</p>
              <p>Privacy Queries: privacy@onefold.in</p>
              <p>Website: https://www.onefold.in</p>
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

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
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

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

function SubSection({ title, children }: SubSectionProps) {
  return (
    <div className="pl-4 border-l border-gray-700 space-y-1">
      <h3 className="text-white font-medium">{title}</h3>
      <div className="text-gray-400 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}