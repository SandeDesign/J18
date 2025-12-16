export default function About() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-purple-900 rounded-2xl blur-2xl opacity-30"></div>
            <img
              src="/edied-j18.png"
              alt="Jonna Rincon"
              className="relative rounded-2xl shadow-2xl neon-border w-full"
            />
          </div>

          <div>
            <h2 className="text-5xl font-bold mb-6 neon-glow">About Jonna</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Jonathan aka  is a human being with a creative mind which is described by many people as ''not from this world'' You may already recognize his J18 tag at the beginning and/or end of every track, or by the clock sound in his work.
              </p>
              <p>
                Mostly known for his raw and authentic moombahton style in tracks or beats. But have in mind that this young man has much to offer. From modern rap beats to the dirty old classic hip hop beats, from warm and smooth r&b instrumentals to the world of EDM (electronic dance music) to studying to jonna's lo-fi instrumentals which he made on his trip on earth; 
</p>
              <p>
              Born in Maastricht, The Netherlands & based in Tilburg he began making music when first made contact with any music instrument nearby. When he visited his nephews in Dominican Republic, he was shown FL Studio for the first time. When Jonna saw that it was possible to make a track with a PC, he made his first track immediately together with his oldest nephew and that's where the music production journey started. 
</p>
              <p>
10+ Years later and the stuff what he can do with a creative program like that is absolute crazy. From the most little things and the most weird noises....never-mind, Jonna Rincon is able to make something out of it... And you can hear that on songs like  and  which have been played on MTV and the Dutch Radio. Not there yet, but on the way. J18

(J18=Jeighteen) (Jeighteen=his tag & clothing/brand & nickname)
              </p>
              <p className="text-purple-300 font-semibold">
                Based in the Netherlands, working with artists worldwide.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-6 neon-border-subtle">
                <div className="text-3xl font-bold text-purple-400 mb-2">Studio Grade</div>
                <div className="text-sm text-gray-400">Professional Quality</div>
              </div>
              <div className="glass rounded-xl p-6 neon-border-subtle">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-sm text-gray-400">Beat Production</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
