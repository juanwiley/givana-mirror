// src/components/ErrorBoundary.js
'use client';

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // Surface in console for debugging
    console.error('Listings page error boundary:', error, info);
  }
  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div style={{ border: '1px solid #f3d0d0', background: '#fff6f6', padding: 12, borderRadius: 8, color: '#7a1f1f' }}>
          <strong>Something went wrong rendering this section.</strong>
          <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 12, whiteSpace: 'pre-wrap' }}>
            {String(error?.message || error)}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
