import { render, screen } from "@testing-library/react";
import React from "react";
import { contentBuilder } from "../../test-utils/test-helpers";
import ContentCard from "./ContentCard";

describe("Name of the group", () => {
  it("should render with image before", () => {
    const { homeContent, imageContent } = contentBuilder();
    render(
      <ContentCard
        content={homeContent[0]}
        images={imageContent}
        index={0}
        isBefore
      />
    );
    expect(screen.getByText("Heading 1")).toBeInTheDocument();
    expect(screen.getByTestId("image-is-before")).toBeInTheDocument();
    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-home");
  });

  it("should render with image after", () => {
    const { homeContent, imageContent } = contentBuilder();
    render(
      <ContentCard
        content={homeContent[0]}
        images={imageContent}
        index={0}
        isAfter
      />
    );
    expect(screen.getByText("Heading 1")).toBeInTheDocument();
    expect(screen.getByTestId("image-is-after")).toBeInTheDocument();
    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-home");
  });

  it("should render with no image", () => {
    const { homeContent } = contentBuilder();
    render(<ContentCard content={homeContent[0]} index={0} />);
    expect(screen.getByText("Heading 1")).toBeInTheDocument();
    expect(screen.queryByTestId("image-is-after")).not.toBeInTheDocument();
    expect(screen.queryByTestId("image-is-before")).not.toBeInTheDocument();
  });
});
