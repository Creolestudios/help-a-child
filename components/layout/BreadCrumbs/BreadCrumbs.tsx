import React, { useEffect, useState } from "react";

import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { getPathFromUrl } from "../../../utils/url";
import styled from "styled-components";
import { useRouter } from "next/router";

type Breadcrumb = {
  /** Breadcrumb title. Example: 'blog-entries' */
  breadcrumb: string;

  /** The URL which the breadcrumb points to. Example: 'blog/blog-entries' */
  href: string;
};

const Icon = styled(FiChevronRight)`
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 600;
`;

const StyledNav = styled.nav`
  width: 100%;
  padding: 32px 64px;

  ol {
    display: flex;

    li {
      a {
        // color: ${({ theme }) => theme.colors.secondary.normal};
      }
      &:last-child {
        a {
          font-weight: 600;
        }
      }
    }
  }
`;

export default function BreadCrumbs() {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | null>(null);

  const convertBreadcrumb = (title: string): React.ReactNode => {
    let transformedTitle = getPathFromUrl(title);

    // decode for utf-8 characters and return ascii.
    return decodeURI(transformedTitle);
  };

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  return (
    <StyledNav>
      <ol>
        <li className="with-divider">
          <Link href="/" className="font-avenir flex items-center">
            Home
            <FiChevronRight
              style={{ stroke: "black", strokeWidth: "4" }}
              className="mx-2"
            />
          </Link>
        </li>
        {breadcrumbs?.map((breadcrumb, i) => {
          if (!breadcrumb || breadcrumb.breadcrumb.length === 0) {
            return;
          }
          return (
            <li key={breadcrumb.href}>
              <Link
                href={breadcrumb.href}
                className="flex items-center font-avenir capitalize"
              >
                {convertBreadcrumb(breadcrumb.breadcrumb)}
                <FiChevronRight
                  style={{ stroke: "black", strokeWidth: "4" }}
                  className={i < breadcrumbs.length - 1 ? "mx-2" : "hidden"}
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </StyledNav>
  );
}
