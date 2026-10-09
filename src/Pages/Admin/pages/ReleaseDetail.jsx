import ReleaseDetail from "../../Dashboard/Releases/ReleaseDetail";
import adminApi from "../adminApi";

export default function AdminReleaseDetail() {
  return (
    <ReleaseDetail
      api={adminApi}
      basePath="/admin/release"
      listPath="/admin/releases"
      listLabel="Back to Releases"
      canEdit={false}
      canApprove
    />
  );
}
