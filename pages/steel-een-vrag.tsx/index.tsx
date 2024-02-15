import { Container, Grid } from "@mui/material";
import { Hero } from "../../components/layout";
import { H2, P, TitleWithHighlights } from "../../components/typography";
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  getContentTags,
  getForumOverviewPageData,
  getForumPosts,
} from "../../utils/api";
import Button from "../../components/buttons/Button";
import { ForumPageProps } from "../../types/pageTypes";
import { POST_PER_PAGE } from "../../constants/app-configs";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import parseImageURL from "../../utils/parseImageURL";
import Input from "../../components/form/Input/Input";
import { useForm } from "react-hook-form";
import TextArea from "../../components/form/TextArea/TextArea2";
import Upload from "../../components/form/Upload/Upload";
const forumSortOptions = [
  { name: "Titel (a-z)", value: "content" },
  { name: "Titel (z-a)", value: "-content" },
  { name: "Auteur (a-z)", value: "user_name" },
  { name: "Auteur (z-a)", value: "-user_name" },
  { name: "Datum (oud-nieuw)", value: "date_created" },
  { name: "Datum (nieuw-oud)", value: "-date_created" },
];

export const getServerSideProps = async () => {
  try {
    const pageReq = await getForumOverviewPageData();
    // const tagsReq = await getContentTags({
    //   filter: `filter[type][_eq]=main`,
    // });
    const forumReq = await getForumPosts({
      postPerPage: POST_PER_PAGE,
      meta: "filter_count",
    });

    const pageRes = await pageReq.json();
    const forumRes = await forumReq.json();
    // const tagsRes = await tagsReq.json();

    return {
      props: {
        pageData: pageRes.data || null,
        forumData: forumRes.data || null,
        totalPosts: forumRes.meta?.filter_count || null,
        // tags: tagsRes.data || null,
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

export default function Forum({
  pageData,
  forumData,
  totalPosts,
  tags,
}: ForumPageProps) {
  const [posts, setPosts] = useState(forumData);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(totalPosts);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const submitForm = async (data: any) => {
    setIsLoading(true);
    try {
      // await postVolunteerApplication(data);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    }

    setIsLoading(false);
  };
  const changePage = (index: number) => {
    if (index <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(index);
    }
  };

  const handleSearch = (x: any) => {
    setSearch(x.target.value);
    setCurrentPage(1);
  };

  const handleSort = (x: string) => {
    setSort(x);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file || null);
  };

  useEffect(() => {
    const getPaginatedPost = async () => {
      setIsLoading(true);
      try {
        const req = await getForumPosts({
          postPerPage: POST_PER_PAGE,
          page: currentPage,
          search,
          sort,
          meta: "filter_count",
          filter:
            selectedTag.length > 0
              ? `filter[categories][categories_id][id][_eq]=${selectedTag}`
              : ``,
        });
        const res = await req.json();

        setPosts(res.data ?? []);
        setTotalCount(res?.meta?.filter_count || 0);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    getPaginatedPost();
  }, [currentPage, search, sort, selectedTag]);
  return (
    <PageWrapper
      seo={{
        title: pageData?.seo_title ? pageData?.seo_title : pageData?.page_title,
        description: "",
        canonical: "http://localhost:3000/forum",
        image: pageData?.seo_image
          ? parseImageURL(pageData?.seo_image?.id)
          : "",
      }}
    >
      <Hero
        center
        imageUrl={"/header_forum.png"}
        style={{
          minHeight: 649,
          position: "relative",
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={12} md={8} className="w-[100%] mx-auto  mt-[-80px]">
              <TitleWithHighlights
                text={pageData?.page_title ?? ""}
                color="white"
                style={{
                  textAlign: "center",
                  padding: "0 24px",
                  fontSize: "64px",
                  fontWeight: "400",
                }}
              />
              <P
                color="white"
                variant="light"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "300",
                  marginBottom: "6px",
                }}
              >
                {pageData?.page_subtitle}
              </P>

              <div
                style={{ display: "flex", gap: 32, justifyContent: "center" }}
              >
                <Button
                  variant="white"
                  filled={false}
                  href="/ik-wil-een-buddy"
                  style={{
                    width: "auto",
                    padding: "16px 64px",
                    fontSize: "18px",
                    fontWeight: "300",
                    border: "1px solid #fff",
                  }}
                >
                  {pageData?.chat_button_label}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Hero>

      <main style={{ marginBottom: "80px" }}>
        <Container className="mb-[80px] mt-[-79px] relative md:mb-[120px]"></Container>
      </main>
    </PageWrapper>
  );
}
