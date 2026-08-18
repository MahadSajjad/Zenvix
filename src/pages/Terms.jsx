import React from 'react';
import { LegalPageLayout } from '../components/layout/LegalPageLayout';
import { termsData } from '../data/terms';

export function Terms() {
  return (
    <LegalPageLayout
      title="Payment Terms & Conditions"
      eyebrow="Terms & Conditions"
      lastUpdated={termsData.lastUpdated}
      sections={termsData.sections}
    />
  );
}
