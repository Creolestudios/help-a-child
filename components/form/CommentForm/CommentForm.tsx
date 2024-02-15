import { Container, Grid } from "@mui/material";
import { H2, H3, P } from "../../typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled, { useTheme } from "styled-components";

import Button from "../../buttons/Button";
import ForumComment from "../../content-types/ForumComment/ForumComment";
import { ForumCommentType } from "../../../types/forumTypes";
import Image from "next/image";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import { postComment } from "../../../utils/api";
import { rgba } from "../../../utils/colors";

type Props = {
  commentFormType?: string;
  submitLabel?: string;
  formSubtitle?: string;
  reactieClass?: string;
  style?: any;
  formTitle?: string;
  type?: "forum" | "blog" | "open_letter";
  postId: string;
  comments?: ForumCommentType[];
  preText?: string;
  parent?: string;
  className?: string;
  isReplyComment?: boolean;
};

const SubmitForm = ({
  type,
  postId,
  replyId,
  isSubmitted,
  onIsSubmit,
  paddingSize = "md",
  className,
  formTitle,
  submitLabel,
  formSubtitle,
}: {
  type: "forum" | "blog" | "open_letter";
  postId: string;
  replyId?: string;
  isSubmitted: boolean;
  className?: string;
  paddingSize?: "sm" | "md";
  formSubtitle?: string;
  submitLabel?: string;
  formTitle?: string;
  onIsSubmit: (x: boolean) => void;
}) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForumCommentType>();

  const submitForm = async (data: any) => {
    setIsLoading(true);
    const body = { ...data, post_id: postId, parent_comment: replyId };
    try {
      await postComment(type, body);
      onIsSubmit(true);
    } catch (error) {
      onIsSubmit(false);
    }

    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<ForumCommentType> = async (data) => {
    submitForm(data);
  };
  const StyledForm = styled.div`
    &:before {
      content: " ";
      display: block;
      position: absolute;
      left: 0;
      top: 0px;
      width: 100%;
      height: 100%;
      opacity: 0.25;
      background: url("/chatBg.png");
      // background-size: cover;
      // background-repeat: no-repeat;
      /* background-position: center center; */
      z-index: 1;
      background-size: 59%;
      background-position: left 225px top -75px;
    }
    display: flex;
    height: 100%;
    border-radius: 8px;
    padding: 32px;

    label {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 800;
      font-size: 18px;
      line-height: 160%;
      color: white;
    }

    form {
      height: 100%;
      position: relative;
      z-index: 2;
      div,
      .selectBox {
        border: none;
      }
      label {
        padding: 0;
        margin: 6px 0;
      }
    }
    .comment-form-button {
      border: none;
    }
    @media (max-width: 768px) {
      padding: 24px !important;
      &:before {
        background-size: 135%;
        background-position: left -108px top 8px;
      }
      form > div > div {
        padding: 14px !important;
      }
      .form-wrapper {
        margin: auto !important;
        width: inherit;
      }
      label {
        margin-bottom: 6px;
        line-height: 130%;
      }
    }
  `;

  const getCommentForm = () => {
    switch (type) {
      case "forum":
        return (
          <React.Fragment>
            <Grid item xs={12} sm={6} md={3}>
              <Input
                label="Voornaam"
                name="user_name"
                register={register}
                placeholder="Jouw naam..."
                required
                hasError={!!errors.user_name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Input
                label="Leeftijd"
                type="number"
                name="user_age"
                placeholder="Jouw leeftijd..."
                register={register}
                required
                hasError={!!errors.user_age}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Input
                label="E-mail"
                type="email"
                name="user_email"
                placeholder="Jouw email..."
                register={register}
                required
                hasError={!!errors.user_email}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Input
                label="Woonplaats"
                name="residence"
                placeholder="Jouw woonplaats..."
                register={register}
                required
                hasError={!!errors.residence}
              />
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Reactie"
                name="content"
                placeholder="Jouw reactie..."
                required
                rows={3}
                register={register}
                hasError={!!errors.content}
                helperText={!!errors.content ? "Dit veld is verplicht" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="info"
                loading={isLoading}
                disabled={isSubmitted}
                className="bg-[#fff] text-[#FF971D]"
              >
                {isLoading && "bezig..."}
                {isSubmitted && "Verzonden"}
                {!isLoading &&
                  !isSubmitted &&
                  (submitLabel || "Reactie plaatsen")}
              </Button>
            </Grid>
          </React.Fragment>
        );
      case "open_letter":
        return (
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <Input
                label="Voornaam"
                name="user_name"
                register={register}
                placeholder="Jouw naam..."
                required
                hasError={!!errors.user_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="Leeftijd"
                type="number"
                name="user_age"
                placeholder="Jouw leeftijd..."
                register={register}
                required
                hasError={!!errors.user_age}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="E-mail"
                type="email"
                name="user_email"
                placeholder="Jouw email..."
                register={register}
                required
                hasError={!!errors.user_email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="Woonplaats"
                name="residence"
                placeholder="Jouw woonplaats..."
                register={register}
                required
                hasError={!!errors.residence}
              />
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Reactie"
                name="content"
                placeholder="Jouw reactie..."
                required
                register={register}
                hasError={!!errors.content}
                helperText={!!errors.content ? "Dit veld is verplicht" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="info"
                loading={isLoading}
                disabled={isSubmitted}
                className="comment-form-button bg-[#fff] text-[#FF971D]"
              >
                {isLoading && "bezig..."}
                {isSubmitted && "Verzonden"}
                {!isLoading &&
                  !isSubmitted &&
                  (submitLabel || "Reactie plaatsen")}
              </Button>
            </Grid>
          </React.Fragment>
        );
      default:
        return null;
    }
  };
  return (
    <div className="relative h-[100%] z-10">
      <StyledForm className={className ? `${className}` : `bg-[#ff971d]`}>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={"16"} className="form-wrapper">
              {formTitle && (
                <Grid item xs={12} lg={12}>
                  <H3 className="text-[#fff]">
                    {formTitle}
                    <Image
                      priority
                      src={"/note.svg"}
                      width={40}
                      height={40}
                      alt={"Heading icon"}
                      objectFit="contain"
                      className="pl-1 inline float-right absolute"
                    />
                  </H3>
                  {formSubtitle && (
                    <P className="text-[#fff]">{formSubtitle}</P>
                  )}
                </Grid>
              )}
              {getCommentForm()}
            </Grid>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <H3 variant="bold" color="white">
              Bedankt! Jouw reactie wordt door ons beoordeeld.
            </H3>
          </div>
        )}
      </StyledForm>
    </div>
  );
};

export default function CommentForm({
  type = "blog",
  submitLabel,
  commentFormType,
  comments = [],
  preText,
  formSubtitle,
  postId,
  parent,
  className,
  isReplyComment,
  formTitle,
  style,
  reactieClass,
}: Props) {
  const { colors } = useTheme();
  const [replyId, setReplyId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReply = (id: string) => {
    setReplyId(id);
  };

  return (
    <Container className="max-w-[1118px]" style={style}>
      {!parent ? (
        !formTitle ? (
          <>
            <Grid container className="m-[0] mt-[70px] mb-[6px]">
              <Grid item xs={12} md={8} lg={8}>
                <H2 className={`text-[35px] md:text-[42px] ${reactieClass}`}>
                  Reacties ({comments.length})
                </H2>
              </Grid>
            </Grid>
            {comments
              .filter((comment) => comment.status === "published")
              .map((comment) => (
                <Grid container key={comment.id}>
                  <Grid item xs={12}>
                    <div
                      style={{
                        borderBottom: `1px solid ${rgba(
                          colors.primary.normal,
                          0.2
                        )}`,
                        marginBottom: "32px",
                      }}
                    >
                      <ForumComment
                        author={comment.user_name}
                        age={comment.user_age}
                        postDate={new Date(comment.date_created)}
                        title={comment.content}
                        onReply={() => handleReply(comment.id)}
                        commentFormType={commentFormType}
                      />

                      <div
                        className={
                          replyId === comment.id
                            ? "overflow-hidden max-h-[999px]"
                            : "overflow-hidden max-h-[0px]"
                        }
                      >
                        <SubmitForm
                          paddingSize="sm"
                          postId={postId}
                          replyId={comment.id}
                          isSubmitted={isSubmitted}
                          type={type}
                          onIsSubmit={(x) => setIsSubmitted(x)}
                          className={className}
                        />
                      </div>
                      {comment.child_comments
                        ?.filter((comment) => comment.status === "published")
                        .map((child) => (
                          <div key={child.id} className="pl-3">
                            <ForumComment
                              isReplyComment
                              author={child.user_name}
                              age={child.user_age}
                              postDate={new Date(child.date_created)}
                              title={child.content}
                              onReply={() => handleReply(child.id)}
                              commentFormType={commentFormType}
                            />
                            <div
                              className={
                                replyId === child.id
                                  ? "overflow-hidden max-h-[999px]"
                                  : "overflow-hidden max-h-[0px]"
                              }
                            >
                              <SubmitForm
                                paddingSize="sm"
                                postId={postId}
                                replyId={child.id}
                                isSubmitted={
                                  isSubmitted && replyId === child.id
                                }
                                type={type}
                                onIsSubmit={(x) => setIsSubmitted(x)}
                                className={className}
                              />
                            </div>
                            {child.child_comments
                              ?.filter(
                                (comment) => comment.status === "published"
                              )
                              .map((grandChild) => (
                                <div key={grandChild.id}>
                                  <ForumComment
                                    isReplyComment
                                    author={grandChild.user_name}
                                    age={grandChild.user_age}
                                    postDate={new Date(grandChild.date_created)}
                                    title={grandChild.content}
                                    onReply={() => handleReply(grandChild.id)}
                                    commentFormType={commentFormType}
                                  />
                                  <div
                                    className={
                                      replyId === grandChild.id
                                        ? "overflow-hidden max-h-[999px]"
                                        : "overflow-hidden max-h-[0px]"
                                    }
                                  >
                                    <SubmitForm
                                      paddingSize="sm"
                                      postId={postId}
                                      replyId={grandChild.id}
                                      isSubmitted={
                                        isSubmitted && replyId === grandChild.id
                                      }
                                      type={type}
                                      onIsSubmit={(x) => setIsSubmitted(x)}
                                      className={className}
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  </Grid>
                </Grid>
              ))}
          </>
        ) : (
          <div>
            <SubmitForm
              postId={postId}
              isSubmitted={isSubmitted}
              type={type}
              onIsSubmit={(x) => setIsSubmitted(x)}
              className={className}
              formTitle={formTitle}
              formSubtitle={formSubtitle}
              submitLabel={submitLabel}
            />
          </div>
        )
      ) : (
        <div>
          <div>
            <H3
              variant="bold"
              className="text-[36px] font-[400] mb-[20px] md:mb-[32px] md:text-[42px]"
            >
              {parent}
            </H3>
          </div>
          <SubmitForm
            postId={postId}
            isSubmitted={isSubmitted}
            type={type}
            onIsSubmit={(x) => setIsSubmitted(x)}
            className={className}
            submitLabel={submitLabel}
          />
        </div>
      )}
    </Container>
  );
}
