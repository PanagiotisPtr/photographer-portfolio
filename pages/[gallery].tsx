import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import fs from "fs";
import path from "path";
import Image from "../utils/types/Image";
import Footer from "../components/Footer";
import MainMenu from "../components/MainMenu";
import { ReactPhotoCollage } from "react-photo-collage";
import Introduction from "../components/Introduction";

interface GalleryProps {
  en: {
    title: string;
    description: string;
  };
  gr: {
    title: string;
    description: string;
  };
  images: Array<Image>;
}

const Gallery: React.FC<GalleryProps> = ({ en, gr, images }) => {
  return (
    <>
      <MainMenu />
      <div style={{ marginBottom: "6em" }}>
        <Introduction
          title={en.title}
          leftText={en.description}
          rightText={gr.description}
        />
      </div>
      <div
        style={{
          width: "90vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10em",
        }}
      >
        <ReactPhotoCollage
          width="90vw"
          layout={[2, 1, 2]}
          height={["20vh", "20vh", "20vh"]}
          photos={images.map((image): { source: string } => ({
            source: image.src,
          }))}
        />
      </div>
      <Footer />
    </>
  );
};

interface StaticPropsParams extends ParsedUrlQuery {
  gallery: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("galleries");

  const paths: Array<{ params: StaticPropsParams }> = files.map((filename) => ({
    params: {
      gallery: filename.replace(".json", ""),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { [key: string]: any },
  StaticPropsParams
> = async ({ params }) => {
  const gallery = params?.gallery;
  const contents = fs
    .readFileSync(path.join("galleries", gallery + ".json"))
    .toString();

  return {
    props: {
      ...JSON.parse(contents),
    },
  };
};

export default Gallery;
