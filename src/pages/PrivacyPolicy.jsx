import React from 'react';
import { LegalPageLayout } from '../components/layout/LegalPageLayout';
import { privacyPolicyData } from '../data/privacyPolicy';

export function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Your privacy matters."
      eyebrow="Privacy Policy"
      lastUpdated={privacyPolicyData.lastUpdated}
      sections={privacyPolicyData.sections}
    />
  );
}
