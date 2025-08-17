import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/post/post-card';
import { transformProjectToPost } from '@/lib/utils';
import { Project, Tag } from '@/types';
import {
  Card, CardContent, CardHeader
} from '@/components/ui/card';
import {
  Search, Filter, Plus, TrendingUp, Clock, Star, Code, Users, Rocket, X, Grid3X3, List
} from 'lucide-react';

// Using shared types from `@/types`

type FeedTag = Tag & { usage_count?: number };

interface FeedProps {
  projects: {
    data: Project[];
    links: Array<{ url: string; label: string; active: boolean }>;
    meta: { current_page: number; total: number; per_page: number; from: number; to: number };
  };
  availableTags: FeedTag[];
  projectTypeCounts: Record<string, number>;
  filters: {
    search: string;
    type: string;
    tags: string[];
    sort: string;
  };
  title?: string;
  isFeatured?: boolean;
}

const projectTypes = {
  all: 'All Projects',
  web: 'Web Apps',
  mobile: 'Mobile Apps',
  design: 'UI/UX Design',
  backend: 'Backend',
  fullstack: 'Full Stack',
  other: 'Other'
};

const sortOptions = [
  { value: 'newest', label: 'Latest', icon: Clock },
  { value: 'popular', label: 'Popular', icon: TrendingUp },
  { value: 'rating', label: 'Top Rated', icon: Star },
  { value: 'oldest', label: 'Oldest', icon: Clock }
];

export default function Feed({
  projects,
  availableTags,
  projectTypeCounts,
  filters,
  title = 'Feed',
  isFeatured = false
}: FeedProps) {
  const [searchQuery, setSearchQuery] = useState(filters.search ?? '');
  const [selectedTags, setSelectedTags] = useState(filters.tags);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Project[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    router.get(window.location.pathname, {
      ...filters,
      ...newFilters,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  }, [filters]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    updateFilters({ search: searchQuery });
  }, [searchQuery, updateFilters]);

  const fetchSearchSuggestions = useCallback(async (query: string) => {
    if (query.length < 1) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
        const SearchingProjects=
        projects.data.
        filter(x => x.title.toLowerCase().includes(query.toLowerCase()) || x.description.toLowerCase().includes(query.toLowerCase()) );

      setSearchSuggestions(SearchingProjects || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      setSearchSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search suggestions
    searchTimeoutRef.current = setTimeout(() => {
      fetchSearchSuggestions(value);
    }, 300);
  }, [fetchSearchSuggestions]);


  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [handleClickOutside]);

  const toggleTag = useCallback((tagSlug: string) => {
    const newTags = selectedTags.includes(tagSlug)
      ? selectedTags.filter(t => t !== tagSlug)
      : [...selectedTags, tagSlug];
    setSelectedTags(newTags);
    updateFilters({ tags: newTags });
  }, [selectedTags, updateFilters]);

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
    updateFilters({ search: '', type: 'all', tags: [], sort: 'newest' });
  }, [updateFilters]);

  const activeFiltersCount = useMemo(() => {
    return selectedTags.length + (filters.search ? 1 : 0) + (filters.type !== 'all' ? 1 : 0);
  }, [selectedTags, filters.search, filters.type]);

  return (
    <AppLayout requireAuth={false}>
      <Head title={title} />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden py-12 sm:py-16 lg:py-20"
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Discover
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Innovative Projects</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Explore cutting-edge projects from talented developers worldwide
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-6 text-white/90"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {[
                { value: projects.meta?.total || '100+', label: 'Projects' },
                { value: '50+', label: 'Technologies' },
                { value: '24/7', label: 'Community' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm sm:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">        {/* Search and Filters Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 lg:mb-12 shadow-xl border-0 bg-white/95 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
            <CardContent className="relative p-4 sm:p-6 lg:p-8">
              {/* Mobile Filter Button */}
              <div className="lg:hidden flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Find Projects</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="relative hover:bg-blue-50"
                  aria-label="Toggle filters"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* Search Bar with Suggestions */}
              <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mb-6 lg:mb-8">
                <div className="relative" ref={searchInputRef}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search projects, technologies, or developers..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => searchQuery.length >=1 && setShowSuggestions(true)}
                    className="pl-12 pr-24 sm:pr-36 h-12 sm:h-14 text-base sm:text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 shadow-sm transition-all duration-200"
                    aria-label="Search projects"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2">
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 sm:h-10 px-4 sm:px-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                      aria-label="Submit search"
                    >
                      <span className="hidden sm:inline">Search</span>
                      <Search className="w-4 h-4 sm:hidden" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className={`hidden lg:flex h-8 sm:h-10 px-3 sm:px-4 rounded-full border-2 transition-all duration-200 ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'hover:bg-gray-50'}`}
                      aria-label="Toggle filters"
                    >
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                  </div>
                  </form>

                  {/* Search Suggestions Dropdown */}
                  <AnimatePresence>
                    {showSuggestions && (searchSuggestions.length > 0 || isSearching) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className=" top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
                      >
                        {isSearching ? (
                          <div className="p-4 text-center text-gray-500">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            Searching...
                          </div>
                        ) : (
                          <>
                            <div className="p-3 border-b border-gray-100">
                              <h4 className="text-sm font-semibold text-gray-700">Project Suggestions</h4>
                            </div>
                            {searchSuggestions.map((project, index) => (
                              <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors duration-150"
                                onClick={() => {
                                    window.location.href = `/projects/${project.id}`;
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-gray-900 truncate">{project.title}</h5>
                                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{project.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className="text-xs text-gray-400">by {project.user?.name}</span>
                                      {project.tags && project.tags.length > 0 && (
                                        <div className="flex gap-1">
                                          {project.tags.map((tag) => (
                                            <Badge
                                              key={tag.id}
                                              variant="secondary"
                                              className="text-xs px-2 py-0.5"
                                              style={{ backgroundColor: tag.color + '20', color: tag.color }}
                                            >
                                              {tag.name}
                                            </Badge>
                                          ))}
                                          {project.tags.length > 2 && (
                                            <span className="text-xs text-gray-400">+{project.tags.length - 2}</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

              {/* Filters */}
              <AnimatePresence>
                {(showFilters || showMobileFilters) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FilterContent
                      projectTypes={projectTypes}
                      projectTypeCounts={projectTypeCounts}
                      filters={filters}
                      sortOptions={sortOptions}
                      updateFilters={updateFilters}
                      availableTags={availableTags}
                      selectedTags={selectedTags}
                      toggleTag={toggleTag}
                      showTags={showFilters || showMobileFilters}
                      activeFiltersCount={activeFiltersCount}
                      clearAllFilters={clearAllFilters}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* View Controls and Results Summary */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-gray-600">
              <span className="font-semibold text-gray-900">{projects.data.length}</span> projects found
              {filters.search && (
                <span className="ml-2">
                  for "<span className="font-medium text-blue-600">{filters.search}</span>"
                </span>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {filters.type !== 'all' && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {projectTypes[filters.type as keyof typeof projectTypes]}
                    <Button
                      variant="ghost"
                      onClick={() => updateFilters({ type: 'all' })}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                      aria-label={`Remove ${projectTypes[filters.type as keyof typeof projectTypes]} filter`}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                )}
                {selectedTags.slice(0, 3).map(tagSlug => {
                  const tag = availableTags.find(t => t.slug === tagSlug);
                  return tag ? (
                    <Badge key={tag.id} variant="secondary" className="bg-purple-100 text-purple-800">
                      {tag.name}
                      <Button
                        onClick={() => toggleTag(tagSlug)}
                        className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                        aria-label={`Remove ${tag.name} filter`}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ) : null;
                })}
                {selectedTags.length > 3 && (
                  <Badge variant="secondary">+{selectedTags.length - 3} more</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-700"
                  aria-label="Clear all filters"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3 py-2 rounded-md"
              aria-label="Switch to grid view"
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Grid</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3 py-2 rounded-md"
              aria-label="Switch to list view"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">List</span>
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div
          className={`${viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
            : 'space-y-4'
          }`}
          layout
          transition={{ duration: 0.3 }}
        >
          {projects.data.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCard post={transformProjectToPost(project)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Empty State */}
        {projects.data.length === 0 && (
          <motion.div
            className="text-center py-16 lg:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
              <Card className="relative bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
                <motion.div
                  className="text-gray-400 mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Search className="w-16 h-16 lg:w-20 lg:h-20 mx-auto stroke-1" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">No projects found</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  It seems there are no projects matching your current filters. Try adjusting your search criteria or explore different categories.
                </p>
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    aria-label="Share your first project"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Share Your First Project
                  </Button>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={clearAllFilters}
                      className="w-full sm:w-auto"
                      aria-label="Clear all filters"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Enhanced Pagination */}
        {projects.data.length > 0 && projects.links && (
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 lg:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >

            <div className="flex items-center gap-1 order-1 sm:order-2">
              {projects.links.map((link, index) => (
                <Button
                  key={index}
                  variant={link.active ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => link.url && router.get(link.url)}
                  disabled={!link.url}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className={`px-3 py-2 transition-all duration-200 ${
                    link.active
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-gray-50 hover:shadow-md'
                  }`}
                  aria-label={`Go to page ${link.label}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Enhanced Community Stats */}
        {!isFeatured && (
          <motion.div
            className="mt-20 lg:mt-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                Join Our
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Developer Community</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                Share your work, get invaluable feedback, and connect with developers from around the world.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { icon: Rocket, value: projects.meta?.total || '100+', label: 'Projects Shared', color: 'blue', description: 'Amazing projects from developers worldwide' },
                { icon: Code, value: '50+', label: 'Technologies', color: 'green', description: 'From React to AI, we cover it all' },
                { icon: Users, value: '24/7', label: 'Active Community', color: 'purple', description: 'Always someone online to help' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className={`mx-auto bg-${stat.color}-100 text-${stat.color}-600 rounded-2xl p-4 w-fit group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className="w-8 h-8 lg:w-10 lg:h-10" />
                      </motion.div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className={`text-4xl lg:text-5xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</p>
                      <p className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</p>
                      <p className="text-sm text-gray-500">{stat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}

interface FilterContentProps {
  projectTypes: Record<string, string>;
  projectTypeCounts: Record<string, number>;
  filters: {
    search: string;
    type: string;
    tags: string[];
    sort: string;
  };
  sortOptions: {
    value: string;
    label: string;
    icon: React.ElementType;
  }[];
  updateFilters: (newFilters: Partial<FilterContentProps['filters']>) => void;
  availableTags: FeedTag[];
  selectedTags: string[];
  toggleTag: (tagSlug: string) => void;
  showTags: boolean;
  activeFiltersCount: number;
  clearAllFilters: () => void;
}

const FilterContent = ({
  projectTypes,
  projectTypeCounts,
  filters,
  sortOptions,
  updateFilters,
  availableTags,
  selectedTags,
  toggleTag,
  showTags,
  activeFiltersCount,
  clearAllFilters
}: FilterContentProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="space-y-6 lg:space-y-8"
  >
    {/* Filter Header */}
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-gray-500 hover:text-gray-700"
          aria-label={`Clear all ${activeFiltersCount} filters`}
        >
          Clear all ({activeFiltersCount})
        </Button>
      )}
    </div>

    {/* Project Categories */}
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <Code className="w-4 h-4 mr-2" />
        Categories
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 lg:gap-3">
        {Object.entries(projectTypes).map(([type, label]) => (
          <motion.div
            key={type}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              variant={filters.type === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilters({ type })}
              className={`rounded-xl px-3 py-2 text-sm transition-all duration-200 w-full ${
                filters.type === type
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0'
                  : 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 hover:shadow-md'
              }`}
              aria-label={`Filter by ${label}`}
            >
              <span className="truncate">{label}</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                filters.type === type
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {projectTypeCounts[type] || 0}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Sort Options */}
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <TrendingUp className="w-4 h-4 mr-2" />
        Sort by
      </h4>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
        {sortOptions.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              variant={filters.sort === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilters({ sort: option.value })}
              className={`rounded-xl px-3 py-2 transition-all duration-200 w-full ${
                filters.sort === option.value
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border-0'
                  : 'hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 hover:shadow-md'
              }`}
              aria-label={`Sort by ${option.label}`}
            >
              <option.icon className="w-4 h-4 mr-2" />
              {option.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Technology Tags 
    {showTags && (
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Filter by Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <motion.div
              key={tag.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Badge
                variant={selectedTags.includes(tag.slug) ? 'default' : 'outline'}
                className="cursor-pointer text-sm py-2 px-3 rounded-xl transition-all duration-200 hover:shadow-md"
                style={selectedTags.includes(tag.slug) ? {
                  backgroundColor: tag.color,
                  color: '#fff',
                  border: 'none'
                } : {}}
                onClick={() => toggleTag(tag.slug)}
                aria-label={`Filter by ${tag.name}`}
              >
                {tag.name}
                <span className="ml-2 text-xs opacity-75">
                  {tag.usage_count}
                </span>
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    )}
                    */}
  </motion.div>
);
