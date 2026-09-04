import  React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, User, Search, Plus, Clock, Eye, ArrowUp, ArrowDown, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Posts', count: 45 },
    { id: 'java', name: 'Java', count: 12 },
    { id: 'react', name: 'React', count: 8 },
    { id: 'python', name: 'Python', count: 6 },
    { id: 'career', name: 'Career Advice', count: 10 },
    { id: 'general', name: 'General', count: 9 }
  ];

  const mockPosts = [
    {
      id: 1,
      title: 'Best practices for React Hook optimization?',
      content: 'Im working on a large React application and wondering about the best practices for optimizing hooks performance. Any recommendations?',
      author: 'Sarah Johnson',
      avatar: '👩‍💻',
      category: 'react',
      timestamp: '2 hours ago',
      upvotes: 15,
      downvotes: 2,
      replies: 8,
      views: 124,
      tags: ['react', 'hooks', 'performance']
    },
    {
      id: 2,
      title: 'Java Spring Boot vs Node.js for backend development',
      content: 'Im deciding between Spring Boot and Node.js for my next project. What are the pros and cons of each for scalable web applications?',
      author: 'Mike Chen',
      avatar: '👨‍💼',
      category: 'java',
      timestamp: '4 hours ago',
      upvotes: 23,
      downvotes: 5,
      replies: 12,
      views: 256,
      tags: ['java', 'nodejs', 'backend', 'comparison']
    },
    {
      id: 3,
      title: 'How to transition from QA to Development?',
      content: 'Ive been working as a QA engineer for 3 years. What skills should I focus on to transition into a development role? Any roadmap suggestions?',
      author: 'Emily Rodriguez',
      avatar: '👩‍🔬',
      category: 'career',
      timestamp: '6 hours ago',
      upvotes: 31,
      downvotes: 1,
      replies: 15,
      views: 342,
      tags: ['career', 'transition', 'development', 'qa']
    },
    {
      id: 4,
      title: 'Python vs Java for machine learning projects',
      content: 'Which language would you recommend for someone starting in ML? Ive heard Python is more popular, but Java has better performance.',
      author: 'David Kim',
      avatar: '👨‍🔬',
      category: 'python',
      timestamp: '8 hours ago',
      upvotes: 18,
      downvotes: 3,
      replies: 9,
      views: 189,
      tags: ['python', 'java', 'machine-learning', 'beginner']
    },
    {
      id: 5,
      title: 'Study group for AWS certification preparation',
      content: 'Looking to form a study group for AWS Solutions Architect certification. Anyone interested in weekly virtual meetings?',
      author: 'Alex Thompson',
      avatar: '👨‍🎓',
      category: 'general',
      timestamp: '12 hours ago',
      upvotes: 27,
      downvotes: 0,
      replies: 18,
      views: 278,
      tags: ['aws', 'certification', 'study-group']
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: user?.name || 'Anonymous',
      avatar: '👤',
      category: newPost.category,
      timestamp: 'Just now',
      upvotes: 0,
      downvotes: 0,
      replies: 0,
      views: 1,
      tags: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'general' });
    setShowNewPostModal(false);
  };

  const handleVote = (postId, type) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: type === 'up' ? post.upvotes + 1 : post.upvotes,
          downvotes: type === 'down' ? post.downvotes + 1 : post.downvotes
        };
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="glassmorphism p-6 rounded-2xl mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm opacity-75">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glassmorphism p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-blue-200">Total Members</span>
                  <span className="text-white font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Posts Today</span>
                  <span className="text-white font-bold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Active Users</span>
                  <span className="text-white font-bold">156</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">Community Forum</h1>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 w-64"
                  />
                </div>
                <button
                  onClick={() => setShowNewPostModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="glassmorphism p-6 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {post.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium">{post.author}</p>
                        <div className="flex items-center space-x-2 text-sm text-blue-300">
                          <Clock className="w-3 h-3" />
                          <span>{post.timestamp}</span>
                          <span>•</span>
                          <span className="capitalize">{post.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-blue-300">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-300 cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-blue-200 mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleVote(post.id, 'up')}
                          className="p-1 text-blue-400 hover:text-green-400 transition-colors"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <span className="text-white font-medium">{post.upvotes - post.downvotes}</span>
                        <button
                          onClick={() => handleVote(post.id, 'down')}
                          className="p-1 text-blue-400 hover:text-red-400 transition-colors"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-blue-300">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.replies} replies</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glassmorphism rounded-2xl w-full max-w-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Post</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-blue-200 mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  placeholder="Enter post title..."
                />
              </div>
              
              <div>
                <label className="block text-blue-200 mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                >
                  <option value="general">General</option>
                  <option value="java">Java</option>
                  <option value="react">React</option>
                  <option value="python">Python</option>
                  <option value="career">Career Advice</option>
                </select>
              </div>
              
              <div>
                <label className="block text-blue-200 mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={6}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 resize-none"
                  placeholder="Write your post content..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-6 py-2 text-blue-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
 