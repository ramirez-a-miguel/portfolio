import { Column, Spinner, Text } from "@once-ui-system/core";

type LoadingStateProps = {
  title?: string;
  message?: string;
};

export function LoadingState({
  title = "Loading page",
  message = "Preparing the latest content for you.",
}: LoadingStateProps) {
  return (
    <Column
      as="output"
      fillWidth
      paddingY="80"
      gap="16"
      horizontal="center"
      align="center"
      style={{ minHeight: 320 }}
      aria-live="polite"
    >
      <Spinner size="m" ariaLabel={title} />
      <Column maxWidth="s" gap="8" horizontal="center" align="center">
        <Text align="center" variant="heading-strong-m">
          {title}
        </Text>
        <Text align="center" variant="body-default-m" onBackground="neutral-weak">
          {message}
        </Text>
      </Column>
    </Column>
  );
}
