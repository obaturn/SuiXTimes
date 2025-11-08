"use client";

import React from "react";
import { MessageSquare, Users, TrendingUp, Heart, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/footer";

const CommunityPage = () => {

  const communityStats = [
    { label: "Active Members", value: "50,000+", icon: Users },
    { label: "Daily Posts", value: "2,500+", icon: MessageSquare },
    { label: "Topics", value: "1,200+", icon: TrendingUp },
    { label: "Engagement", value: "95%", icon: Heart }
  ];

  const discussionTopics = [
    {
      title: "Sui Blockchain Updates",
      posts: "1.2K posts",
      members: "850 active",
      trending: true,
      icon: "🔗"
    },
    {
      title: "DeFi Discussions",
      posts: "890 posts",
      members: "620 active",
      trending: true,
      icon: "💰"
    },
    {
      title: "NFT Marketplace",
      posts: "650 posts",
      members: "480 active",
      trending: false,
      icon: "🎨"
    },
    {
      title: "Developer Hub",
      posts: "420 posts",
      members: "320 active",
      trending: false,
      icon: "⚡"
    }
  ];

  const recentPosts = [
    {
      author: "CryptoEnthusiast",
      title: "New Sui Move Contract Best Practices",
      replies: 23,
      likes: 45,
      time: "2 hours ago"
    },
    {
      author: "DeFiExpert",
      title: "Yield Farming Opportunities on Sui",
      replies: 18,
      likes: 32,
      time: "4 hours ago"
    },
    {
      author: "NFTCollector",
      title: "Upcoming NFT Drops This Week",
      replies: 31,
      likes: 67,
      time: "6 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Simple */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Join the{" "}
                <span className="text-blue-600">
                  Sui Community
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Connect with fellow Sui enthusiasts, share knowledge, and stay updated with the latest developments in the Sui ecosystem.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-medium text-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Discussion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Simple */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discussion Topics - Simple */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Popular Topics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join conversations on the most active topics in the Sui community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {discussionTopics.map((topic, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{topic.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                      {topic.trending && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Trending
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {topic.posts} • {topic.members}
                    </div>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      Join Discussion
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts - Simple */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Recent Discussions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest conversations in our community.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-blue-600">{post.author}</span>
                      <span className="text-sm text-gray-500">• {post.time}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{post.replies} replies</span>
                      <span>{post.likes} likes</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Simple */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Become Part of the{" "}
              <span className="text-yellow-300">
                Community
              </span>
            </h2>

            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Sui enthusiasts sharing knowledge, insights, and building the future together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Your First Post
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-medium text-lg">
                <Users className="w-5 h-5 mr-2" />
                Browse Topics
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityPage;
