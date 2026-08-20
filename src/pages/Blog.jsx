import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { FiArrowRight } from 'react-icons/fi';
import { GlobalCTA } from '../components/ui/GlobalCTA';
import { Link } from 'react-router-dom';
import { BlogCard, renderBlogPlaceholderVisual } from '../components/ui/BlogCard';
import { useBlog } from '../hooks/useBlog';
import { Loader } from '../components/ui/Loader';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function Blog() {
  const { posts, loading } = useBlog();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map(p => p.category))];

  // Find the first featured post, or default to the newest post (first in array)
  const featuredPost = posts.find(post => post.featured) || posts[0];

  // Filter remaining posts (exclude featured post if viewing "All", otherwise filter by category)
  const cataloguePosts = posts.filter(post => {
    if (activeCategory === "All") return post.id !== featuredPost?.id;
    return post.category === activeCategory;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* SECTION 1 — BLOG HERO */}
      <section className="relative w-full pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                  Insights
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
                Ideas for building better digital experiences.
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Practical insights, technical perspectives, and strategic thinking on technology, design, SEO, and digital growth from the Zenvix team.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — FEATURED POST */}
      {!loading && featuredPost && activeCategory === "All" && (
        <section className="w-full pb-16 lg:pb-24">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group flex flex-col lg:flex-row bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 hover:border-gray-200 transition-colors"
              >
                {/* Visual Half */}
                <div className="w-full lg:w-3/5 aspect-[16/9] lg:aspect-auto overflow-hidden bg-gray-100 relative">
                  <motion.div
                    className="w-full h-full absolute inset-0"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {featuredPost.image ? (
                      <img src={featuredPost.image} alt={featuredPost.imageAlt || featuredPost.title} className="w-full h-full object-cover" />
                    ) : (
                      renderBlogPlaceholderVisual(featuredPost)
                    )}
                  </motion.div>
                </div>

                {/* Content Half */}
                <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase rounded-full">
                      Featured
                    </span>
                    <span className="text-xs font-bold tracking-[0.15em] text-cta uppercase">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-6 group-hover:text-cta transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary">{featuredPost.author}</span>
                      <span className="text-sm text-gray-500">{featuredPost.date} • {featuredPost.readTime}</span>
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-bold text-cta group-hover:translate-x-2 transition-transform">
                      Read Article <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </Container>
        </section>
      )}

      {/* SECTION 3 — CATEGORY FILTER */}
      <section className="w-full pb-8 sticky top-0 z-20 pt-4 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Container>
          <div className="flex items-center overflow-x-auto no-scrollbar gap-2 sm:gap-4 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 4 — ARTICLE CATALOGUE */}
      <section className="w-full py-16 min-h-[50vh]">
        <Container>
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <Loader text="Loading insights..." />
              ) : cataloguePosts.length > 0 ? (
                <div className="flex flex-col">
                  {cataloguePosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-32 text-center"
                >
                  <p className="text-xl text-gray-500 mb-4">No articles found in this category.</p>
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="text-primary font-bold hover:text-cta transition-colors"
                  >
                    View All Articles
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* SECTION 5 — FINAL CTA */}
      <GlobalCTA />
    </div>
  );
}
