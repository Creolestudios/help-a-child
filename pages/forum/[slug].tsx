import { Container, Grid } from "@mui/material";

import BreadCrumbs from "../../components/layout/BreadCrumbs/BreadCrumbs";
import CommentForm from "../../components/form/CommentForm/CommentForm";
import ENDPOINTS from "../../constants/endpoints";
import ForumPost from "../../components/content-types/ForumPost/ForumPost";
import { ForumCommentType, ForumPostType } from "../../types/forumTypes";
import { GetServerSidePropsContext } from "next";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import React, { useEffect, useState } from "react";
import { getComments } from "../../utils/api";
import Image from "next/image";

type Props = {
  pageData: ForumPostType;
  comments: ForumCommentType[];
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;

  try {
    // Get the posts
    const res = await fetch(
      `${ENDPOINTS.COLLECTIONS}/forum_posts?fields=categories.*.*,*&filter[slug][_eq]=${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await res.json();

    if (!data[0]) {
      return {
        redirect: "/forum",
        permanent: false,
      };
    }
    const commentReq = await getComments("forum", data[0].id);
    const commmentRes = await commentReq.json();

    return {
      props: {
        pageData: data[0] ?? null,
        comments: commmentRes.data ?? null,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
};

export default function ForumDetail({ pageData, comments = [] }: Props) {
  const [newPageData, setNewPageData] = useState<ForumPostType>(pageData);

  useEffect(() => {
    setNewPageData({ ...pageData });
  }, [pageData]);

  const fetchPageData = async () => {
    try {
      // Get the posts
      const res = await fetch(
        `${ENDPOINTS.COLLECTIONS}/forum_posts?fields=categories.*.*,*&filter[slug][_eq]=${pageData.slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await res.json();
      if (!!data[0]) {
        setNewPageData({ ...data[0] });
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <PageWrapper
      seo={{
        title: pageData.title,
        description: "Forum Detail",
        canonical: `http://localhost:3000/forum/${pageData.slug}`,
        og: {
          type: "article",
          article: {
            publishedTime: pageData.date_created,
            modifiedTime: pageData.date_updated,
            authors: [pageData.user_name],
            tags: pageData.categories?.map((cat) => cat.categories_id?.name),
          },
        },
      }}
    >
      <BreadCrumbs />
      <Container className="max-w-[1118px] mt-[64px] md:mt-[128px]">
        <Grid container>
          <Grid item xs={12} className="mx-auto">
            <ForumPost
              id={newPageData.id}
              gender={newPageData.user_gender}
              age={newPageData.user_age}
              postDate={new Date(newPageData.date_created)}
              truncateContent={false}
              tags={
                newPageData.categories?.map((cat) => cat.categories_id?.name) ??
                []
              }
              name={newPageData?.user_name}
              title={newPageData.title ?? "Titel moet in CMS worden ingevoerd"}
              content={newPageData.content}
              comments={comments.length}
              likesCount={newPageData?.likes_count || 0}
              commentsCount={newPageData?.comments.length || 0}
              fullHeight={false}
              image={newPageData.attachment_image}
              fetchData={fetchPageData}
            />
          </Grid>
        </Grid>
      </Container>

      <main className="mt-[100px] md:mt-[128px]">
        <CommentForm
          isReplyComment
          type="forum"
          comments={comments}
          preText="De Buddy’s beantwoorden alle vragen. Zij zaten in eenzelfde situatie
          als jij en hebben dus heel veel wijze raad. Maar niet alleen
          Budd's weten hoe het voelt om gescheiden ouders te hebben, jij
          ook! Heb jij een goede tip? Deel 'm hieronder!"
          postId={pageData.id}
        />
        <section className="mt-[100px] md:mt-[128]">
          <div>
            <CommentForm
              isReplyComment
              postId={pageData.id}
              formTitle={"Geef zelf antwoord op deze vraag"}
              formSubtitle="Vertel ons hoe je heet en hij komt naar je toe!"
              type="forum"
              submitLabel="Ja, ik wil mijn reactie plaatsen"
            />
          </div>
          <div className="relative">
            <Image
              src="/forumbothead.png"
              alt="respond to letter"
              fill
              className="relative h-[750px] mt-[-650px] md:h-[400px] object-cover md:mt-[-250px]"
            />
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
