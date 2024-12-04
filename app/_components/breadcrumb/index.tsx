"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./styles.module.scss";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const Breadcrumb = ({
  homeElement,
  separator,
  containerClasses = styles.breadcrumbContainer,
  listClasses = styles.breadcrumbItem,
  activeClasses = styles.breadcrumbActive,
  capitalizeLinks = false,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      {pathNames.length > 0 && (
        <ul className={containerClasses}>
          <li className={listClasses}>
            <span>{homeElement}</span>
          </li>
          {pathNames.length > 0 && (
            <span className={styles.breadcrumbSeparator}>/</span>
          )}
          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`;
            const itemClasses =
              paths === href ? `${listClasses} ${activeClasses}` : listClasses;
            const itemLink = capitalizeLinks
              ? link[0].toUpperCase() + link.slice(1)
              : link;
            return (
              <React.Fragment key={index}>
                <li className={itemClasses}>
                  <span>{itemLink}</span>
                </li>
                {pathNames.length !== index + 1 && (
                  <span className={styles.breadcrumbSeparator}>/</span>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Breadcrumb;
