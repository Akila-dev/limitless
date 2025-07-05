import {
  Hero,
  EventsSection,
  CenterSphere,
  BulletPointSection,
  Footer,
  StarsCanvas,
} from "@/components";

import { think_tank } from "@/page_data";

export default function Page() {
  const page_data = think_tank;

  return (
    <div className="">
      <StarsCanvas />
      {/* HERO SECTION*/}
      <Hero
        text={{
          title: page_data.hero.heading,
          subtitle: page_data.hero.subheading,
        }}
      />
      {/* EVENTS SECTION */}
      <EventsSection
        text={{
          title: page_data.forum_section.heading,
          paragraph: page_data.forum_section.description,
        }}
      />
      {/* CENTER SPHERE SECTION */}
      <CenterSphere text={{ subtitle: page_data.quoteSection.text }} />
      {/* BULLETPOINTS SECTION */}
      <BulletPointSection
        text={{
          title: page_data.bulletSection.heading,
          paragraph: page_data.bulletSection.description,
        }}
        bullet_list={page_data.bulletSection.bullets_list}
      />
      {/* FOOTER/RESERVE SEAT SECTION */}
      <Footer
        text={{
          title: page_data.footerSection.heading,
          paragraph: page_data.footerSection.description,
        }}
        buttons={page_data.footerSection.buttons}
      />
    </div>
  );
}
