import React from "react";
import useExportableFormData from "../../hooks/useExportableFormData";

function Viewer({ formKey }: { formKey: string }) {
  const { exportableFormView } = useExportableFormData({ formKey });

  console.log(exportableFormView());
  return <div>Viewer</div>;
}

export default Viewer;
