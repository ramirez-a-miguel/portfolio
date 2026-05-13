import { LoadingState } from "@/components";

export default function CertificationsLoading() {
  return (
    <LoadingState
      title="Loading certifications"
      message="Fetching Miguel's public Credly badges. This can take a few seconds when Credly is slow."
    />
  );
}
