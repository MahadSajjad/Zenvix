import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Container } from './components/ui/Container';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-24 bg-gray-50">
          <Container>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Welcome to Zenvix
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Project foundation setup complete. Ready for development.
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
