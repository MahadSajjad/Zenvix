export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_WORDPRESS_URL}/wp-json/zenvix/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: 'error',
        message: data.message || 'Something went wrong while sending your message.',
        errors: data.errors || {}
      };
    }

    return {
      status: 'success',
      message: data.message || 'Thanks — your message has been received. We\'ll be in touch soon.'
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      status: 'error',
      message: 'A network error occurred. Please try again later.',
      errors: {}
    };
  }
};
