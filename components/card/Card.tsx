import React, { ReactNode } from "react";
import styled from "styled-components";

export type Variant = {
  variant?:
    | "brief"
    | "blog"
    | "vlog"
    | "story"
    | "primary"
    | "info"
    | "ideal"
    | "follow";
  className?: string;
};
type Props = Variant & {
  children: ReactNode;
};

const BaseStyle = styled.article`
  background: #ffffff;
  // border: 1px solid #555555;
  border-radius: 8px;
  overflow: hidden;
  display: flex !important;
  flex-direction: column !important;
  header {
    height: 180px;
    position: relative;
  }
  cursor: pointer;
`;

const StyledPost = styled(BaseStyle)`
  header {
    margin-bottom: 0;
  }
`;

const StyledLetter = styled(BaseStyle)`
  border: none;
  // TODO: this is required to make the home grid rows the same size
  // min-height: 624px;
  display: flex;
  flex-direction: column;

  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px 1px rgb(0 0 0 / 0.1) !important;
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px 1px var(--tw-shadow-color) !important;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
  footer {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    a {
      border: none;
    }
    &:hover {
      background: #fff !important;
      h3,
      p {
        color: #000 !important;
      }
      a {
        background: #3fc7b4 !important;
        color: #fff !important;
        border: none;
      }
    }
  }
`;

const StyledStory = styled(BaseStyle)`
  border-color: ${({ theme }) => theme.colors.info.normal};
  padding: 24px;
`;

const StyledBlog = styled(BaseStyle)`
  // padding: 24px;
  // border-color: ${({ theme }) => theme.colors.primary.normal};
  background-color: ${({ theme }) => theme.colors.secondary.normal};
  header {
    height: 294px;

    img,
    video,
    iframe {
      // border-radius: 8px;
      // background-color: ${({ theme }) => theme.colors.grey.normal};
      height: 294px;
    }
  }
  section {
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  footer {
    padding: 24px !important;
    display: flex;
    flex-direction: column;
    flex: 1;
    p {
      color: white;
    }
    h4 {
      color: white;
    }
    a {
      border: none;
      font-weight: 400;
      font-size: 18px;
      font-family: "Fjalla One";
      background: white;
      color: ${({ theme }) => theme.colors.secondary.normal};
    }
  }

  &:hover {
    background-color: white;
    footer {
      color: ${({ theme }) => theme.colors.text.normal};
      h4,
      p {
        color: ${({ theme }) => theme.colors.text.normal};
      }
      a {
        background: ${({ theme }) => theme.colors.secondary.normal};
        color: white;
      }
    }
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px 1px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px 1px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
  }
`;

const StyledBlogNew = styled(BaseStyle)`
  // padding: 24px;
  // border-color: ${({ theme }) => theme.colors.primary.normal};
  background-color: ${({ theme }) => theme.colors.primary.normal};
  header {
    height: 294px;

    img,
    video,
    iframe {
      // border-radius: 8px;
      // background-color: ${({ theme }) => theme.colors.grey.normal};
      height: 294px;
    }
  }
  section {
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  footer {
    padding: 24px !important;
    display: flex;
    flex-direction: column;
    flex: 1;
    p {
      color: white;
    }
    h4 {
      color: white;
    }
    a {
      border: none;
      font-weight: 400;
      font-size: 18px;
      font-family: "Fjalla One";
      background: white;
      color: ${({ theme }) => theme.colors.secondary.normal};
    }
  }

  &:hover {
    background-color: white !important;
    footer {
      color: ${({ theme }) => theme.colors.text.normal};
      h4,
      p {
        color: ${({ theme }) => theme.colors.text.normal};
      }
      a {
        background-color: #3fc7b4 !important;
        color: #fff !important;
      }
    }
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px 1px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px 1px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
  }
`;

const StyledPrimary = styled(BaseStyle)`
  background-color: #006ef7 !important;
  header {
    height: 294px;
    img,
    video,
    iframe {
      // border-radius: 8px;
      // background-color: ${({ theme }) => theme.colors.grey.normal};
      height: 294px;
    }
  }
  &:hover {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px 1px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px 1px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
  }
`;

const StyledInfo = styled(BaseStyle)`
  background-color: #ff971d;
  &:hover {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px 1px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px 1px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
  }
`;

const StyledIdeal = styled(BaseStyle)`
  background-color: #ffecf1 !important;
  &:hover {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px 1px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px 1px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
  }
`;

const StyledFollow = styled(BaseStyle)`
  background-color: #ebfffc;
  &:hover {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px 1px rgb(0 0 0 / 0.1) !important;
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px 1px var(--tw-shadow-color) !important;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
  }
`;

const CardWrapper = ({
  variant,
  children,
  className,
}: React.PropsWithChildren<Variant>) => {
  switch (variant) {
    case "vlog":
      return <StyledBlog className={className}>{children}</StyledBlog>;
    case "blog":
      return <StyledBlogNew className={className}>{children}</StyledBlogNew>;
    case "brief":
      return <StyledLetter className={className}>{children}</StyledLetter>;
    case "story":
      return <StyledStory>{children}</StyledStory>;
    case "primary":
      return <StyledPrimary className={className}>{children}</StyledPrimary>;
    case "info":
      return <StyledInfo className={className}>{children}</StyledInfo>;
    case "ideal":
      return <StyledIdeal className={className}>{children}</StyledIdeal>;
    case "follow":
      return <StyledFollow className={className}>{children}</StyledFollow>;
    default:
      return <StyledPost className={className}>{children}</StyledPost>;
  }
};

export default function Card({
  className,
  variant = "brief",
  children,
}: Props) {
  return (
    <CardWrapper variant={variant} className={className}>
      {children}
    </CardWrapper>
  );
}
