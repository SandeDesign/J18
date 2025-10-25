import { Youtube, Music2, Cloud as CloudIcon } from 'lucide-react';

export default function Music() {
  return (
    <section id="music" className="py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-4 neon-glow">Music</h2>
          <p className="text-xl text-gray-400">Stream my latest tracks across all platforms</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8 neon-border-subtle">
            <div className="flex items-center gap-3 mb-6">
              <Music2 className="w-8 h-8 text-purple-400" />
              <h3 className="text-3xl font-bold neon-glow">Spotify</h3>
            </div>
            <div className="rounded-xl overflow-hidden">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/artist/6o3BlWTeK4EKUyByo35y6F?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
            <a
              href="https://open.spotify.com/artist/6o3BlWTeK4EKUyByo35y6F"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-block text-center py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all neon-border-subtle hover:scale-105"
            >
              Open in Spotify
            </a>
          </div>

          <div className="space-y-8">
            <div className="glass rounded-2xl p-8 neon-border-subtle">
              <div className="flex items-center gap-3 mb-6">
                <Youtube className="w-8 h-8 text-purple-400" />
                <h3 className="text-3xl font-bold neon-glow">YouTube</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Watch my latest beat making sessions, tutorials, and behind-the-scenes content
              </p>
              <a
                href="https://www.youtube.com/jonnarincon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all neon-border-subtle hover:scale-105"
              >
                Visit Channel
              </a>
            </div>

            <div className="glass rounded-2xl p-8 neon-border-subtle">
              <div className="flex items-center gap-3 mb-6">
                <CloudIcon className="w-8 h-8 text-purple-400" />
                <h3 className="text-3xl font-bold neon-glow">SoundCloud</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Exclusive releases, works in progress, and experimental tracks
              </p>
              <a
                href="https://soundcloud.com/jonnarincon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all neon-border-subtle hover:scale-105"
              >
                Listen on SoundCloud
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 glass rounded-2xl p-8 neon-border text-center">
          <h3 className="text-2xl font-bold mb-4 text-purple-300">Want exclusive releases?</h3>
          <p className="text-gray-400 mb-6">
            Subscribe to get early access to new beats, free downloads, and special offers
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-black/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:neon-border-subtle transition-all"
            />
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all neon-border-subtle hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
