import { useEffect, useState } from "react";
import { Events, animateScroll as scroll } from "react-scroll";
import styles from "styles/modules/Home.module.scss";
import { Footer, Header, HeaderWhite, HeadMeta } from "components";
import {
  Design,
  Experience,
  Featured,
  Hero,
  Highlight,
  Project,
} from "sections/Home";
import request from "utils/request";
import {
  queryGetFeatureProducts,
  queryGetLatestProjects,
  queryGetCatHighlight,
  queryGetProductHighlight,
  queryGetLandingMedia,
} from "utils/graphql";

export default function Home({
  featured,
  projects,
  catHighlight,
  productHighlight,
  landingMedia,
}) {
  const [touch, setTouch] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  // const getData = async () => {
  //   const response = await request(`
  //   query {
  //     getAllProjects {
  //       _id
  //       isDraft
  //     }
  //   }
  //   `);
  //   const { getAllProjects } = (response.data || {}).data;
  //   console.log(getAllProjects);
  // };
  useEffect(() => {
    document.body.scrollTo(0, 0);
    // getData();
    Events.scrollEvent.register("end", () => {
      setScrolling(false);
      if (document.documentElement.scrollTop > 500) {
        document.body.style.overflow = "auto";
      }
    });

    return () => {
      Events.scrollEvent.remove("end");
    };
  }, []);

  const scrollToContent = () => {
    document.body.style.overflow = "hidden";
    const content = document.getElementById("header").offsetTop;
    scroll.scrollTo(content, {
      duration: 600,
      smooth: false,
      ignoreCancelEvents: true,
    });
  };

  const scrollToHero = () => {
    document.body.style.overflow = "hidden";
    const content = document.getElementById("hero").offsetTop;
    scroll.scrollTo(content, {
      duration: 600,
      smooth: true,
      ignoreCancelEvents: true,
    });
  };

  const wheelHero = (e) => {
    e.deltaY < 0 && scrollToHero();
    e.deltaY > 0 && scrollToContent();
  };
  const touchHero = (e) => e.touches[0].pageY - touch < 0 && scrollToContent();

  return (
    <div className={styles["container"]}>
      <HeadMeta
        title="John Doe"
        desc="This is changed."
        keywords=""
        robots="index, follow, noimageindex"
        url="https://www.gallaria.com.au/"
        metaOG="/logo.png"
        metaTwitter="/logo.png"
      />

      <div style={{ width: "100%" }}>
        <HeaderWhite />
      </div>
      <Hero
        scrolling={scrolling}
        setScrolling={setScrolling}
        wheelHero={wheelHero}
        touchHero={touchHero}
        setTouch={setTouch}
        scrollToContent={scrollToContent}
        landingMedia={landingMedia}
      />
      <div
        id="header"
        style={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <Header landing />
      </div>
      <Highlight
        scrolling={scrolling}
        setScrolling={setScrolling}
        scrollToHero={scrollToHero}
        setTouch={setTouch}
        touch={touch}
        catHighlight={catHighlight}
        productHighlight={productHighlight}
      />
      <Experience />
      <Featured data={featured} />
      {projects && projects.length > 0 && <Project data={projects} />}
      <Design />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const response = await request(queryGetFeatureProducts);
  const featured = response.data.data.getFeatured;
  const projectResponse = await request(queryGetLatestProjects);
  const projects = projectResponse.data.data.getLatestProjects;
  const catHighlightResponse = await request(queryGetCatHighlight);
  const catHighlight = catHighlightResponse.data.data.getCatHighlight[0];
  const productHighlightResponse = await request(queryGetProductHighlight);
  const productHighlight =
    productHighlightResponse.data.data.getProductHighlight[0];
  const landingMediaResponse = await request(queryGetLandingMedia);
  const landingMedia = landingMediaResponse.data.data.getLandingMedia;

  return {
    props: { featured, projects, catHighlight, productHighlight, landingMedia }, // will be passed to the page component as props
  };
}
