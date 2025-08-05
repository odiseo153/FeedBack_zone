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
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link, usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

  export default function LandingPage() {
    const { auth } = usePage<SharedData>().props;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navigation */}
        <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">FeedBack Zone</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                  How it Works
                </a>
                <a href="#showcase" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Showcase
                </a>
                {auth?.user ? (
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Sign In
                  </Link>
                )}
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Get Smart Feedback on Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Projects. Instantly.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Upload your web or app projects and receive personalized feedback from both AI and our developer community
                to improve your work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                >
                  Submit Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link
                  href="/feed"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-blue-100 bg-white text-blue-700 font-semibold shadow hover:bg-blue-50 hover:text-blue-900 transition-all duration-200"
                  style={{ boxShadow: '0 2px 16px 0 rgba(80, 112, 255, 0.08)' }}
                >
                  <span>View Projects</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Project Preview */}
            <div className="mt-16 relative">
              <div className="bg-white rounded-2xl shadow-2xl border p-8 max-w-4xl mx-auto">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">feedback-zone.com/dashboard</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Dashboard Preview</h3>
                  <p className="text-gray-600">Track feedback, ratings, and improvements for all your projects</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Get feedback in three simple steps</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Submit Your Project</h3>
                <p className="text-gray-600">
                  Upload via GitHub repository or share your live project URL. We support all major frameworks and
                  technologies.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Choose Feedback Type</h3>
                <p className="text-gray-600">
                  Select AI analysis, community reviews, or both. Specify areas you want feedback on like code quality or
                  UX design.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Get Tailored Advice</h3>
                <p className="text-gray-600">
                  Receive detailed feedback with actionable suggestions to improve your project and boost its success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600">Everything you need to improve your projects</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Code className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle>AI Code Analysis</CardTitle>
                  <CardDescription>
                    Get detailed feedback on code quality, performance, and best practices
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Search className="w-8 h-8 text-violet-600 mb-2" />
                  <CardTitle>SEO & Performance</CardTitle>
                  <CardDescription>Comprehensive analysis of your site's SEO and performance metrics</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Eye className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle>UI/UX Improvements</CardTitle>
                  <CardDescription>Expert suggestions on design, usability, and user experience</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Zap className="w-8 h-8 text-violet-600 mb-2" />
                  <CardTitle>AI Integration Tips</CardTitle>
                  <CardDescription>Recommendations for incorporating AI features into your project</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Star className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle>Community Ratings</CardTitle>
                  <CardDescription>Get rated and reviewed by fellow developers and creators</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-violet-600 mb-2" />
                  <CardTitle>Project Discovery</CardTitle>
                  <CardDescription>Showcase your work and discover trending projects in the community</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Use FeedBack Zone Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Use FeedBack Zone?</h2>
              <p className="text-xl text-gray-600">Accelerate your project's success</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Faster Project Validation</h3>
                <p className="text-gray-600">Get quick insights to validate your ideas before investing more time</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Improve Before Launch</h3>
                <p className="text-gray-600">Fix issues and optimize your project before going public</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Learn from Creators</h3>
                <p className="text-gray-600">Connect with other developers and learn from their experiences</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Better Portfolio</h3>
                <p className="text-gray-600">Showcase polished projects that stand out to employers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-xl text-gray-600">Discover what the community is building</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Productivity</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  <CardTitle>TaskFlow Pro</CardTitle>
                  <CardDescription>A modern task management app with AI-powered scheduling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">by John Doe</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Finance</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.6</span>
                    </div>
                  </div>
                  <CardTitle>CryptoTracker</CardTitle>
                  <CardDescription>Real-time cryptocurrency portfolio management dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">by Sarah Miller</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Social</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <CardTitle>DevConnect</CardTitle>
                  <CardDescription>A networking platform for developers to collaborate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">by Mike Johnson</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Feedback Preview Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Feedback Preview</h2>
              <p className="text-xl text-gray-600">See what kind of insights you'll receive</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>AI Analysis Report</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">Comprehensive feedback for "TaskFlow Pro"</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Code className="w-4 h-4 mr-2 text-blue-600" />
                        Code Quality Score: 8.5/10
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Your code follows best practices with good separation of concerns. Consider implementing error
                        boundaries for better error handling.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Search className="w-4 h-4 mr-2 text-violet-600" />
                        SEO Score: 7.2/10
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Good meta descriptions and title tags. Improve loading speed and add structured data for better
                        search visibility.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Eye className="w-4 h-4 mr-2 text-blue-600" />
                        UX Recommendations
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Consider adding keyboard shortcuts for power users and improving the onboarding flow with
                        interactive tutorials.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Creators Say</h2>
              <p className="text-xl text-gray-600">Join thousands of satisfied developers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "The AI feedback helped me identify performance bottlenecks I never would have found. My app is now
                    40% faster!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">Alex Lee</p>
                      <p className="text-sm text-gray-600">Full-stack Developer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "The community feedback was invaluable. I got insights from experienced developers that completely
                    changed my approach."
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>RP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">Rachel Park</p>
                      <p className="text-sm text-gray-600">Frontend Designer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "FeedBack Zone helped me polish my portfolio project. I landed my dream job thanks to the improvements
                    I made!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>DW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">David Wilson</p>
                      <p className="text-sm text-gray-600">Software Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-violet-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Improve Your Project?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Submit it now and get feedback in minutes. Join thousands of developers who are building better projects
              with FeedBack Zone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">FeedBack Zone</span>
                </div>
                <p className="text-gray-400">Get smart feedback on your projects from AI and the developer community.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
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
