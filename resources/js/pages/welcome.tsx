import {
    ArrowRight,
    CheckCircle,
    Code,
    Eye,
    GitBranch,
    MessageSquare,
    Rocket,
    Search,
    Star,
    TrendingUp,
    Users,
    Zap,
  } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import { Badge } from '@/components/ui/badge'
  import { Avatar, AvatarFallback } from '@/components/ui/avatar'
  import { Link, usePage } from '@inertiajs/react'
  import { SharedData } from '@/types'
  import { motion } from 'framer-motion'
  import { useEffect, useState } from 'react'


  const FeatureCard = ({
    icon: Icon,
    title,
    description,
  }: {
    icon: typeof Code
    title: string
    description: string
  }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow hover:-translate-y-2">
      <CardHeader className="text-center">
        <Icon className="w-10 h-10 text-blue-600 mb-2 mx-auto" />
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{description}</CardDescription>
      </CardHeader>
    </Card>
  )

  const ProjectCard = ({ title, subtitle, category, rating, author }: { title: string, subtitle: string, category: string, rating: number, author: string }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between mb-1">
          <Badge variant="secondary">{category}</Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">by {author}</span>
        </div>
      </CardContent>
    </Card>
  )

  /* -------------------------------------------------------
     Main Landing Page
  ------------------------------------------------------- */
  export default function LandingPage() {
    const { auth } = usePage<SharedData>().props
    const [scrolled, setScrolled] = useState(false)

    /* Sticky header background effect */
    useEffect(() => {
      const handler = () => setScrolled(window.scrollY > 80)
      window.addEventListener('scroll', handler)
      return () => window.removeEventListener('scroll', handler)
    }, [])

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
        {/* ---------- Navigation ---------- */}
        <nav
          className={`fixed w-full z-50 transition-all ${
            scrolled
              ? 'bg-white/90 backdrop-blur-sm border-b border-gray-200'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Brand */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-violet-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-gray-800">FeedBack Zone</span>
              </div>

              {/* Nav links */}
              <div className="hidden md:flex items-center space-x-8">
                {['#features', '#how-it-works', '#showcase'].map((href) => (
                  <a
                    key={href}
                    href={href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {href.slice(1).replace(/-/g, ' ')}
                  </a>
                ))}

                {auth?.user ? (
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/login" className="text-gray-600 hover:text-gray-900">
                    Sign In
                  </Link>
                )}

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          {/* Background with parallax effect */}
          <div className="absolute inset-0">
            <img
              src="https://img.freepik.com/free-vector/young-programmer-businessman-freelance-working-desk-with-laptop_40876-2665.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Project showcase"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-center scale-110 transform transition-transform duration-1000"
            />
            {/* Enhanced gradient overlay with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-violet-900/60 to-purple-900/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                AI-Powered Feedback Platform
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Get Smart Feedback on Your{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 text-transparent bg-clip-text animate-pulse">
                  Projects
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 rounded-full" />
              </span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                Instantly.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Upload your web or app projects and receive{' '}
              <span className="text-blue-300 font-semibold">personalized feedback</span> from AI and our community of
              developers to <span className="text-violet-300 font-semibold">improve your work</span>.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <span className="relative z-10 flex items-center">
                  Submit Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-violet-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <Link
                href="/feed"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold shadow-xl hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats section */}
            <motion.div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { number: '10K+', label: 'Projects Reviewed' },
                { number: '5K+', label: 'Active Developers' },
                { number: '98%', label: 'Satisfaction Rate' },
                { number: '24/7', label: 'AI Feedback' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
            </div>
          </motion.div>
        </section>

        {/* ---------- How It Works ---------- */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                How It Works
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Get feedback in three simple steps
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Submit Your Project</h3>
                <p className="text-gray-600">
                  Upload via GitHub repository or share your live project URL. We support all major frameworks.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Choose Feedback Type</h3>
                <p className="text-gray-600">
                  Pick AI analysis, community reviews, or both. Specify focus areas like code quality or UX.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Get Tailored Advice</h3>
                <p className="text-gray-600">
                  Receive detailed feedback with actionable suggestions to improve your project &amp; boost success.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section id="features" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Powerful Features
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Everything you need to improve your projects
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <FeatureCard
                icon={Code}
                title="AI Code Analysis"
                description="Get detailed feedback on code quality, performance, and best practices"
              />
              <FeatureCard
                icon={Search}
                title="SEO & Performance"
                description="Comprehensive analysis of your site's SEO and performance metrics"
              />
              <FeatureCard
                icon={Eye}
                title="UI/UX Improvements"
                description="Expert suggestions on design, usability, and user experience"
              />
              <FeatureCard
                icon={Zap}
                title="AI Integration Tips"
                description="Recommendations for incorporating AI features into your project"
              />
              <FeatureCard
                icon={Star}
                title="Community Ratings"
                description="Get rated and reviewed by fellow developers and creators"
              />
              <FeatureCard
                icon={TrendingUp}
                title="Project Discovery"
                description="Showcase your work and discover trending projects"
              />
            </motion.div>
          </div>
        </section>

        {/* ---------- Why Use FeedBack Zone ---------- */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Why Use FeedBack Zone?
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Accelerate your project's success
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg w-12 h-12 mx-auto flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Faster Project Validation</h3>
                <p className="text-gray-600">
                  Get quick insights to validate your ideas before investing more time
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg w-12 h-12 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Improve Before Launch</h3>
                <p className="text-gray-600">Fix issues & optimize before going public</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg w-12 h-12 mx-auto flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Learn from Creators</h3>
                <p className="text-gray-600">Connect and learn from their experiences</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg w-12 h-12 mx-auto flex items-center justify-center mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Better Portfolio</h3>
                <p className="text-gray-600">Showcase polished projects that stand out to employers</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------- Showcase ---------- */}
        <section id="showcase" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Featured Projects
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover what the community is building
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ProjectCard
                title="TaskFlow Pro"
                subtitle="Modern task management with AI scheduling"
                category="Productivity"
                rating={4.8}
                author="John Doe"
              />

              <ProjectCard
                title="CryptoTracker"
                subtitle="Real-time crypto portfolio dashboard"
                category="Finance"
                rating={4.6}
                author="Sarah Miller"
              />

              <ProjectCard
                title="DevConnect"
                subtitle="Networking platform for devs"
                category="Social"
                rating={4.9}
                author="Mike Johnson"
              />
            </motion.div>
          </div>
        </section>

        {/* ---------- AI Feedback Preview ---------- */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                AI Feedback Preview
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                See what kind of insights you'll receive
              </motion.p>
            </div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-0 shadow-2xl overflow-hidden bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 text-white relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <CardTitle className="flex p-2 items-center space-x-3 text-xl">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Zap className="w-6 h-6" />
                      </div>
                      <span>AI Analysis Report</span>
                    </CardTitle>
                    <CardDescription className="text-blue-100 mt-2 text-base">
                      Comprehensive feedback for "TaskFlow Pro"
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Code Quality */}
                  <div className="group hover:bg-blue-50/50 p-4 rounded-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 flex items-center text-lg">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                          <Code className="w-5 h-5 text-blue-600" />
                        </div>
                        Code Quality Score
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        </div>
                        <span className="font-bold text-blue-600">8.5/10</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Your code follows best practices with excellent separation of concerns. Consider implementing error boundaries for enhanced error handling and user experience.
                    </p>
                  </div>

                  {/* SEO Score */}
                  <div className="group hover:bg-violet-50/50 p-4 rounded-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 flex items-center text-lg">
                        <div className="p-2 bg-violet-100 rounded-lg mr-3 group-hover:bg-violet-200 transition-colors">
                          <Search className="w-5 h-5 text-violet-600" />
                        </div>
                        SEO Score
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"></div>
                        </div>
                        <span className="font-bold text-violet-600">7.2/10</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Strong meta descriptions and semantic HTML structure. Enhance loading performance and implement structured data markup for improved search visibility.
                    </p>
                  </div>

                  {/* UX Recommendations */}
                  <div className="group hover:bg-emerald-50/50 p-4 rounded-xl transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <h4 className="font-semibold text-gray-900 flex items-center text-lg">
                        <div className="p-2 bg-emerald-100 rounded-lg mr-3 group-hover:bg-emerald-200 transition-colors">
                          <Eye className="w-5 h-5 text-emerald-600" />
                        </div>
                        UX Recommendations
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 leading-relaxed">
                          Implement keyboard shortcuts for power users to enhance productivity
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 leading-relaxed">
                          Add interactive onboarding tutorials to reduce learning curve
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ---------- Testimonials ---------- */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                What Creators Say
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Join thousands of satisfied developers
              </motion.p>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[{
                id: 1,
                quote: "The AI feedback helped me identify performance bottlenecks I never would have found. My app is now 40% faster!",
                name: "Alex Lee",
                role: "Full-stack Developer",
              },
              {
                id: 2,
                quote: "The community feedback was invaluable. I got insights from experienced devs that completely changed my approach.",
                name: "Rachel Park",
                role: "Frontend Designer",
              },
              {
                id: 3,
                quote: "FeedBack Zone helped me polish my portfolio project. I landed my dream job thanks to the improvements I made!",
                name: "David Wilson",
                role: "Software Engineer",
              }].map((t) => (
                <Card key={t.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{t.quote}</p>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{t.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{t.name}</p>
                        <p className="text-sm text-gray-600">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ---------- Final CTA ---------- */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-violet-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Ready to Improve Your Project?
            </motion.h2>
            <motion.p
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Submit it now and get feedback in minutes. Join thousands of developers who are building better projects
              with FeedBack Zone.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Feedback Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                View Pricing
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ---------- Footer ---------- */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-violet-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold">FeedBack Zone</span>
                </div>
                <p className="text-gray-400">
                  Get smart feedback on your projects from AI and the developer community.
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  {['Features', 'Pricing', 'API', 'Integrations'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  {['About', 'Contact', 'Privacy', 'Terms'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  {['GitHub', 'Twitter', 'Discord', 'Blog'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 FeedBack Zone. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
