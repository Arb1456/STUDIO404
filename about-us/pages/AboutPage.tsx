import React from 'react';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { BookingHandler } from '../types';
import { ArrowRight, Star, Heart, Zap, Coffee } from 'lucide-react';

interface AboutPageProps {
  onBook: BookingHandler;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBook }) => {
  return (
    <div className="w-full min-h-screen bg-cream text-charcoal pb-32">
      
      {/* S1: Hero */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">
              A Space Built for <br />
              <span className="italic">Creatives</span>, by a Creative.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10 opacity-80">
              Studio 404 is more than just a rental studio — it’s a place to belong. 
              Designed to bridge the gap between accessibility and professional quality.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <Button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              Explore the Studio
            </Button>
          </Reveal>
        </div>
      </section>

      {/* S2: Origin Story */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto border-t border-charcoal/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <Reveal>
              <div className="aspect-[4/5] w-full bg-gray-200 overflow-hidden relative">
                 <img 
                  src="https://picsum.photos/800/1000?grayscale" 
                  alt="Founder working in studio" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
          </div>
          <div className="order-1 md:order-2">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">The Origin</h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-6 text-lg leading-relaxed opacity-90">
                <p>
                  It started with a frustration common to many creatives in Ottawa: the lack of a "middle ground." 
                  You either had to rent a massive, expensive commercial soundstage or try to make do with a cramped, 
                  dimly lit basement.
                </p>
                <p>
                  I wanted to build something different. A space that felt premium but approachable. 
                  A place where a fashion photographer could shoot a campaign in the morning, and a 
                  podcaster could record an episode in the afternoon.
                </p>
                <p>
                  Studio 404 was born out of the desire to democratize high-end production spaces.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* S3: Built by Hand */}
      <section className="bg-white px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-12 md:items-start mb-16">
              <h2 className="font-serif text-4xl md:text-6xl flex-1">
                Built by Hand. <br/>
                <span className="italic text-gray-400">Sweat Equity.</span>
              </h2>
              <div className="flex-1 max-w-md">
                <p className="text-lg opacity-80 mb-8 leading-relaxed">
                  Every curve of the cyclorama wall was sanded by hand. Over 200 hours of craftsmanship went into creating our signature infinity background from the ground up.
                </p>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-charcoal/10 pt-6">
                  {['Framing', 'Cutting', 'Drywall', 'Mudding', 'Taping', 'Sanding', 'Priming', 'Painting'].map((step) => (
                    <div key={step} className="flex items-center text-xs md:text-sm font-medium tracking-widest uppercase opacity-60">
                      <span className="w-1.5 h-1.5 bg-charcoal/40 rounded-full mr-3"></span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="w-full aspect-video md:aspect-[2.35/1] bg-gray-100 overflow-hidden">
               <img 
                  src="https://picsum.photos/1600/900?blur=2" 
                  alt="Cyclorama wall construction detail" 
                  className="object-cover w-full h-full opacity-90"
                />
            </div>
          </Reveal>
        </div>
      </section>

      {/* S4: Home for All */}
      <section className="px-6 py-24 md:py-32 max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="text-xs font-bold tracking-widest uppercase mb-4 block opacity-50">Inclusivity First</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8">A Home for All Creators</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-xl leading-relaxed opacity-80">
            Whether you are shooting your very first portfolio piece or your hundredth commercial campaign, 
            you deserve a space that treats you with respect. There are no gatekeepers here. 
            If you have a vision, Studio 404 is your canvas.
          </p>
        </Reveal>
      </section>

      {/* S5: The Mission */}
      <section className="px-6 py-20 bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">The Mission</h2>
            <p className="text-2xl font-light leading-relaxed text-cream/80">
              "To remove the physical barriers to creation by providing professional-grade tools, 
              light, and space to the Ottawa creative community."
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            <Reveal delay={200}>
               <img src="https://picsum.photos/400/600?random=1" className="w-full h-64 object-cover opacity-80" alt="Studio lighting" />
            </Reveal>
            <Reveal delay={300}>
               <img src="https://picsum.photos/400/600?random=2" className="w-full h-64 object-cover opacity-80 mt-12" alt="Camera gear" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* S6: Community Vision */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
             <Reveal>
                <h2 className="font-serif text-4xl md:text-5xl mb-6">Growing Together</h2>
             </Reveal>
          </div>
          <div className="flex-1">
             <Reveal delay={100}>
                <p className="text-lg mb-6 opacity-80">
                  We see Studio 404 becoming a hub for education and collaboration. 
                  Future plans include lighting workshops, community mixers, and an equipment 
                  lending library to help up-and-coming artists get their start.
                </p>
                <p className="text-lg opacity-80">
                  This isn't just a room for rent. It's an ecosystem for growth.
                </p>
             </Reveal>
          </div>
        </div>
      </section>

      {/* S7: Values */}
      <section className="px-6 py-16 border-t border-b border-charcoal/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-12 opacity-50">Our Core Values</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Creativity", icon: <Zap className="w-6 h-6 mb-4 opacity-70"/>, desc: "We believe in the power of making things." },
              { title: "Quality", icon: <Star className="w-6 h-6 mb-4 opacity-70"/>, desc: "Professional standards, always." },
              { title: "Innovation", icon: <ArrowRight className="w-6 h-6 mb-4 opacity-70"/>, desc: "Pushing boundaries and trying new things." },
              { title: "Hospitality", icon: <Heart className="w-6 h-6 mb-4 opacity-70"/>, desc: "A warm welcome, every single time." }
            ].map((value, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="p-6 bg-cream h-full border border-transparent hover:border-charcoal/10 transition-colors duration-300">
                  {value.icon}
                  <h4 className="font-serif text-xl mb-3">{value.title}</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* S8: Closing */}
      <section className="px-6 py-32 text-center">
        <Reveal>
          <p className="font-serif text-3xl md:text-5xl italic leading-tight max-w-3xl mx-auto text-charcoal/90">
            "Don't let the lack of space limit the size of your ideas."
          </p>
        </Reveal>
      </section>

      {/* S9: Final CTA */}
      <section className="px-4 py-8 mb-20">
        <div className="bg-charcoal text-cream rounded-[2rem] p-12 md:p-24 text-center max-w-7xl mx-auto relative overflow-hidden">
           {/* Abstract BG Shape */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-cream blur-[100px]"></div>
           </div>

           <div className="relative z-10">
              <Reveal>
                <h2 className="font-serif text-4xl md:text-7xl mb-6">Welcome to Studio 404</h2>
                <p className="text-lg md:text-xl opacity-80 mb-10 max-w-lg mx-auto">
                  Your key is waiting. Come build something beautiful.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="flex justify-center">
                  <Button 
                    variant="primary" 
                    className="bg-cream text-charcoal hover:bg-white border-transparent rounded-full px-12"
                    onClick={() => onBook('rental')}
                  >
                    Book the Studio
                  </Button>
                </div>
              </Reveal>
           </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;