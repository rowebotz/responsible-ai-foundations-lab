import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
interface SEOProps {
  title?: string;
  description?: string;
}
export function SEO({
  title = "Responsible AI Foundations Lab | Stephen Rowe",
  description = "Enterprise AI platform prototype demonstrating LLM evaluation, guardrails, similarity search, observability, experimentation, and governance. Designed and engineered by Stephen Rowe."
}: SEOProps) {
  const location = useLocation();
  useEffect(() => {
    // Update Document Title
    document.title = title;
    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    // Update OG URL dynamically
    const currentUrl = window.location.origin + location.pathname;
    const placeholderImage = "https://placehold.co/1200x630/0f172a/6366f1?text=Veritas+AI+Lab";
    const updateMeta = (property: string, content: string, attr: 'property' | 'name' = 'property') => {
      let element = document.querySelector(`meta[${attr}="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    // Update OG tags
    updateMeta('og:url', currentUrl);
    updateMeta('og:title', "Responsible AI Foundations Lab | Enterprise AI Platform Prototype");
    updateMeta('og:description', description);
    updateMeta('og:image', placeholderImage);
    // Update Twitter tags
    updateMeta('twitter:url', currentUrl);
    updateMeta('twitter:title', "Responsible AI Foundations Lab | Enterprise AI Platform Prototype", 'name');
    updateMeta('twitter:description', description, 'name');
    updateMeta('twitter:image', placeholderImage, 'name');
  }, [title, description, location.pathname]);
  return null;
}